/**
 * useGridKeyboardNavigation
 *
 * Composable that augments a Kendo-based grid with accessible keyboard navigation,
 * focus management, and custom behaviors for column header menus (filter/sort).
 *
 * This composable:
 * - Adds keyboard handlers to header <th> elements so Enter/Space open the column
 *   menu or trigger sort depending on column configuration.
 * - Makes headers tabbable and sets appropriate ARIA attributes/roles.
 * - Hides Kendo's visible menu anchors while preserving them for anchoring, and
 *   applies limited style adjustments (pointer-events on .k-link) to avoid
 *   accidental sorting from clicks while using this composable.
 * - Observes the document for dynamically rendered Kendo menu containers
 *   (elements with class .k-animation-container) and attaches keydown handlers
 *   to manage menu navigation (Tab within filter submenus, ArrowUp/ArrowDown in
 *   main menu, Escape to close and restore focus).
 * - Provides helpers to integrate with the grid's keydown and sort-change events.
 *
 * Important details / assumptions:
 * - Intended for grids produced by Kendo UI (classes such as .k-grid, .k-table-row,
 *   .k-grid-header-menu, .k-columnmenu-item, .k-animation-container are relied upon).
 * - Mutates DOM attributes and inline styles for header cells and menu anchors to
 *   enforce the desired keyboard behavior and anchoring. These are performed
 *   post-mount (via nextTick).
 * - Attaches event listeners to document-scoped nodes and uses a MutationObserver
 *   on document.body. It is therefore critical to call/return the cleanup hooks
 *   (handled automatically on component unmount by this composable).
 *
 * @param gridRef - Vue Ref to the grid component instance (expected to expose a .columns array
 *                  compatible with the grid column definitions so that header attributes
 *                  such as data-feather-k-field, data-feather-k-filterable and
 *                  data-feather-k-sortable can be derived).
 *
 * @returns An object with:
 *  - activeFilterButton: Ref<HTMLElement | null> — reference to the last-activated
 *    header/menu button; used to restore focus after closing menus.
 *  - handleGridKeyDown: (e: KeyboardEvent) => void — handler intended to be wired to the
 *    grid's keydown event to enable row navigation (ArrowUp/ArrowDown), prevent default
 *    scrolling, and capture/filter header/menu related key events.
 *  - handleSortChange: (event: GridSortChangeEvent, customHandler?: any) => void — a
 *    replacement/augmenter for the grid's sort change event that distinguishes menu
 *    opens from actual sort actions, prevents sorting when the field is non-sortable,
 *    and optionally forwards valid sort changes to a consumer-provided handler while
 *    restoring focus to the originating header button.
 *
 * @remarks
 * - Keyboard behaviors implemented:
 *   - Space on a header/menu button triggers its click (used to open column menus).
 *   - Enter/Space on a focusable header opens the menu (if filterable) or triggers a sort
 *     (if sortable and not filterable).
 *   - Within column menus:
 *     - Escape closes the menu and returns focus to the filter button that opened it.
 *     - Tab/Shift+Tab is used to navigate focusable controls in the filter submenu.
 *     - ArrowUp/ArrowDown navigate between top-level menu items when not inside the filter submenu.
 * - Cleanup:
 *   - All added DOM event listeners and the MutationObserver are removed on
 *     unmount via the composable's internal onBeforeUnmount logic.
 *
 * @example
 * // In a Vue setup():
 * // const gridRef = ref(null);
 * // const { activeFilterButton, handleGridKeyDown, handleSortChange } = useGridKeyboardNavigation(gridRef);
 * // Bind handleGridKeyDown to the grid's native keydown or gridKeyDown hook and handleSortChange to the grid's sortChange.
 *
 * @public
 */

import { ref, nextTick, onMounted, onBeforeUnmount, type Ref } from "vue";
import type { SortDescriptor } from "@progress/kendo-data-query";
import type { GridColumnProps, GridSortChangeEvent } from "@progress/kendo-vue-grid";

export const useGridKeyboardNavigation = (gridRef: Ref<any>) => {
  // Reference to the active filter button for focus management
  const activeFilterButton = ref<HTMLElement | null>(null);

  // Mutation observer for dynamic elements
  let mutationsObserver: MutationObserver | null = null;

  const headerThTeardownCallbacks: Array<() => void> = [];

  // Helper to get columns from gridRef
  const getColumns = () => {
    return (gridRef?.value as any)?.columns as Array<GridColumnProps>;
  };

  // This is to allow keyboard users to trigger the filter button using Space key
  const handleFilterButtonKeyboardListener = (event: KeyboardEvent) => {
    const key = event.key || event.code;
    if ([" ", "Spacebar", "Space", "Enter"].includes(key)) {
      // Prevents the unintended default sorting on keyboard event
      event.preventDefault();
      event.stopPropagation();

      // Store reference to the filter button when it is activated
      activeFilterButton.value = event.target as HTMLElement;

      // Trigger the click event on the filter button
      (event.target as HTMLElement).click();
    }
  };

  //Filter Menu keyboard listener (a.k.a filter dropdown menu)
  const handleFilterMenuKeyboardListener = (event: KeyboardEvent) => {
    // Currently only handling Escape key to close the filter dropdown
    // and reset focus to the filter button that opened it
    // (Could be extended to handle other keys if needed for menu navigation)

    if (!activeFilterButton.value) return;
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      // Reset focus to the filter button that opened the dropdown
      if (activeFilterButton.value) {
        activeFilterButton.value.focus();
      }
      return;
    }

    // Get all top menu items (Sort ASC, Sort DESC, Filter)
    const menuItems = Array.from(
      document.querySelectorAll(
        ".k-animation-container .k-popup .k-column-menu .k-columnmenu-item-wrapper .k-columnmenu-item"
      )
    ) as HTMLElement[];

    // Get the filter sub menu
    const filterContainer = document.querySelector(".k-filter-menu-container");

    // // Get the filter sub menu
    if (filterContainer) {
      // Only handle Tab navigation within filter submenu
      // Using arrow keys changes the value in the dropdown before moving to the next field.
      // This is not the behavior we want so we have to use Tab to navigate filter sub menu.
      if (event.code === "Tab") {
        const focusableSelectors = [
          // Filter dropdowns and inputs
          ".k-filter-menu-container .k-dropdownlist[tabindex='0']",
          ".k-filter-menu-container input.k-input-inner:not([tabindex='-1']):not([disabled])",
          ".k-filter-menu-container button:not([tabindex='-1']):not([disabled])",
        ];
        const focusableElements = Array.from(
          filterContainer.querySelectorAll(focusableSelectors.join(","))
        ) as HTMLElement[];

        // If nothing focusable, do nothing
        if (focusableElements.length === 0) return;

        // Find the currently focused element
        const focusedIndex = focusableElements.findIndex((el) => el === document.activeElement);
        // Determine next (Tab) or previous (Shift+Tab)
        let targetIndex: number;
        if (focusedIndex === -1) {
          targetIndex = 0;
        } else if (event.shiftKey) {
          targetIndex = (focusedIndex - 1 + focusableElements.length) % focusableElements.length;
        } else {
          targetIndex = (focusedIndex + 1) % focusableElements.length;
        }

        event.preventDefault();
        event.stopPropagation();

        // Focus the target element
        focusableElements[targetIndex]?.focus();
        return;
      }
    } else {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();

        // Find the currently focused item
        const focusedIndex = menuItems.findIndex((item) => item === document.activeElement);

        let targetIndex = focusedIndex;
        if (event.code === "ArrowUp") {
          targetIndex = focusedIndex > 0 ? focusedIndex - 1 : menuItems.length - 1;
        } else if (event.code === "ArrowDown") {
          targetIndex = focusedIndex < menuItems.length - 1 ? focusedIndex + 1 : 0;
        }

        // Focus the target item
        menuItems[targetIndex]?.focus();
        return;
      }
    }

    if (event.code === "Tab") {
      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        (activeFilterButton.value?.previousElementSibling as HTMLElement).focus();
      } else {
        (activeFilterButton.value?.nextElementSibling as HTMLElement).focus();
      }
    }
  };

  // NOTE: Setup mutation observer to watch for dynamic filter dropdown menus
  // This is necessary because the filter dropdowns are rendered dynamically
  // and we need to attach keyboard listeners to them when they are added to the DOM
  const setupFilterMenuObserver = () => {
    mutationsObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            // Check if the element is a filter dropdown
            if (element.classList.contains("k-animation-container")) {
              const column = activeFilterButton.value as HTMLElement;
              if (column) {
                const sortable = column.dataset.featherKSortable === "true";
                if (!sortable) {
                  // Remove sort menu items if column is not sortable
                  nextTick(() => {
                    const wrappers = element.querySelectorAll(".k-columnmenu-item-wrapper");
                    wrappers.forEach((wrapper) => {
                      const sortMenu = wrapper.textContent?.toLowerCase().includes("sort");
                      if (sortMenu) {
                        wrapper.remove();
                      }
                    });
                  });
                }
              }
              // Attach keyboard listener for the filter menu
              element.addEventListener("keydown", handleFilterMenuKeyboardListener);
              // Auto-focus and open click the menuitem
              // if there is only one menu item (the filter sub-menu)
              // (This will work for any scenario where there is only one menuitem)
              nextTick(() => {
                const tryFocusMenuItem = () => {
                  const menuItems = Array.from(
                    element.querySelectorAll(
                      ".k-animation-container .k-popup .k-column-menu .k-columnmenu-item-wrapper .k-columnmenu-item"
                    )
                  ) as HTMLElement[];

                  if (menuItems.length === 1) {
                    menuItems[0].focus();
                    menuItems[0].click();
                    (tryFocusMenuItem as any).attempts = 0; // reset attempts
                  } else if (menuItems.length > 1) {
                    // Stop polling if more than one menuitem is present
                    (tryFocusMenuItem as any).attempts = 0; // reset attempts
                    return;
                  } else {
                    // Try again in 200ms, up to 3 times (600ms total)
                    if ((tryFocusMenuItem as any).attempts === undefined)
                      (tryFocusMenuItem as any).attempts = 0;
                    if ((tryFocusMenuItem as any).attempts++ < 3) {
                      setTimeout(tryFocusMenuItem, 200);
                    }
                  }
                };
                tryFocusMenuItem();
              });
            }

            // Also check if any child elements are .k-animation-container
            const animationContainers = element.querySelectorAll(".k-animation-container");
            animationContainers.forEach((container) => {
              (container as HTMLElement).addEventListener(
                "keydown",
                handleFilterMenuKeyboardListener
              );
            });
          }
        });

        // Check for removed nodes (cleanup)
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            if (element.classList.contains("k-animation-container")) {
              element.removeEventListener("keydown", handleFilterMenuKeyboardListener);
            }

            const animationContainers = element.querySelectorAll(".k-animation-container");
            animationContainers.forEach((container) => {
              (container as HTMLElement).removeEventListener(
                "keydown",
                handleFilterMenuKeyboardListener
              );
            });
          }
        });
      });
    });

    // Start observing the document body for changes
    mutationsObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  // NOTE:  Custom keyboard listener for Grid keydown event
  // https://www.telerik.com/kendo-vue-ui/components/grid/api/gridkeydownevent
  // HMMM: This GridKeyDownEvent does not provide access to the nativeElement
  // that was the target of the event (cannot preserve element to set focus)
  const handleGridKeyDown = (e: KeyboardEvent) => {
    // Handle keyboard navigation within the grid
    if (!e.type) return; // ignore initial undefined event

    if (!e) {
      return;
    }
    const target = e.target as HTMLElement;
    if (!target) return;

    if (["ArrowDown", "ArrowUp", "Enter", "Space"].includes(e.code)) {
      // Prevent default scrolling behavior
      e.preventDefault();

      if (
        target.classList.contains("k-grid-header-menu") &&
        target.classList.contains("k-grid-column-menu")
      ) {
        // NOTE:  This setting is the reason we cannot use GridKeyDownEvent.
        // We need access to the native event target to manage focus.
        // Store reference to the filter button when it is focused
        activeFilterButton.value = target as HTMLElement;
      } else if (target.classList.contains("k-table-row")) {
        // ROW NAVIGATION Begin
        // Get the row where the keydown event occurred
        const currentRow = (e.target as HTMLElement).closest("tr");
        if (!currentRow) return;

        // Determine the next row based on arrow key direction
        let targetRow: Element | null = null;
        if (e.code === "ArrowDown") {
          targetRow = currentRow.nextElementSibling;
        } else if (e.code === "ArrowUp") {
          targetRow = currentRow.previousElementSibling;
        }

        // Set focus to new target row if it exists
        if (targetRow && targetRow.hasAttribute("tabindex")) {
          currentRow.setAttribute("tabindex", "-1");
          (targetRow as HTMLElement).setAttribute("tabindex", "0");
          (targetRow as HTMLElement).focus();
        }
        // ROW NAVIGATION End
      } else {
        // Not a keydown event on the grid that we care about.
      }
    }
  };

  // NOTE: Setup .fk-grid styling for the grid component with this composable
  const setupGridStyling = () => {
    nextTick(() => {
      const gridElement = gridRef.value.$el.closest(".k-grid") as HTMLElement;
      if (gridElement) gridElement.classList.add("fk-grid");
    });
  };

  const setupTrNavigation = () => {
    try {
      // Set initial tabindex and role for "data" rows (exclude header)
      const rows = Array.from(
        gridRef.value.$el.querySelectorAll(".k-table-row[data-grid-row-index]") as HTMLElement[]
      );
      rows.forEach((row, index) => {
        row.setAttribute("tabindex", index === 0 ? "0" : "-1");
      });
    } catch (error) {
      console.error("Error setting up row navigation:", error);
    }
  };

  // NOTE: Augment filter button with ARIA role, tabstop, and keyboard listener
  // This is to allow keyboard users to trigger the filter button with Enter or Space key
  // This is done after the component is mounted to ensure the DOM is ready
  const setupFilterButtonAccessibility = () => {
    nextTick(() => {
      const filterSelector = ".k-grid-header .k-grid-header-menu.k-grid-column-menu";
      const filterButtons = document.querySelectorAll(filterSelector);
      if (filterButtons) {
        filterButtons.forEach((el) => {
          // el.setAttribute("tabindex", "0");
          el.setAttribute("role", "button");
          (el as HTMLElement).addEventListener("keydown", handleFilterButtonKeyboardListener);
        });
      }

      // Setup dynamic element watcher for filter dropdown menus
      setupFilterMenuObserver();

      // NOTE: Setup headers to trigger hidden button
      setupHeaderThTriggers();
    });
  };

  // NOTE: Remove the keyboard listener from filter buttons
  // This is to prevent memory leaks and ensure clean-up when the component is destroyed
  const cleanupFilterButtonAccessibility = () => {
    const filterSelector = ".k-grid-header .k-grid-header-menu.k-grid-column-menu";
    const filterButtons = document.querySelectorAll(filterSelector);
    if (filterButtons) {
      filterButtons.forEach((el) => {
        (el as HTMLElement).removeEventListener("keydown", handleFilterButtonKeyboardListener);
      });
    }

    // Cleanup the mutation observer
    if (mutationsObserver) {
      mutationsObserver.disconnect();
      mutationsObserver = null;
    }

    // Remove all header <th> event listeners
    headerThTeardownCallbacks.forEach((teardown) => teardown());
    headerThTeardownCallbacks.length = 0;
  };

  // NOTE: Setup header <th> elements to trigger the hidden filter button
  const setupHeaderThTriggers = () => {
    const headerCells = document.querySelectorAll(".k-grid-header .k-table-thead th");

    headerCells.forEach((th, index) => {
      const btn = th.querySelector(".k-grid-header-menu.k-grid-column-menu") as HTMLElement | null;
      if (!btn) return;

      const columns = getColumns();

      // Set data-sortable attribute based on column definition
      // Assumes columns are in the same order as th elements
      if (columns && columns[index]) {
        // Ensure the field is a string (fallback to empty string if undefined)
        const field = columns[index].field ?? "";
        th.setAttribute("data-feather-k-field", field);
        th.setAttribute(
          "data-feather-k-filterable",
          columns[index].filterable === false ? "false" : "true"
        );
        th.setAttribute(
          "data-feather-k-sortable",
          columns[index].sortable === false ? "false" : "true"
        );

        // NOTE:  Find descendent .k-link and set pointer-events: none
        // (Clicking on .k-link should not trigger the sort)
        // THEMEBUILDER:  This is only appropriate when using this composable; so DOES NOT belong on THEMEBUILDER
        const link = th.querySelector(".k-link") as HTMLElement;
        if (link) {
          link.style.pointerEvents = "none";
        }
      }

      const filterable = (th as HTMLElement).dataset.featherKFilterable !== "false";
      const sortable = (th as HTMLElement).dataset.featherKSortable !== "false";

      // Visually hide button but keep in DOM for Kendo anchoring
      // NOTE:  THIS WILL NEED TO BE SETUP IN THEMEBUILDER
      btn.style.position = "absolute";
      btn.style.top = "0";
      btn.style.right = "0";
      btn.style.width = "100%";
      btn.style.opacity = "0";
      btn.style.pointerEvents = "none";
      btn.style.zIndex = "-1";
      btn.style.overflow = "hidden";
      // NOTE: End Themebuilder

      btn.setAttribute("tabindex", "-1");
      // Don't set aria-hidden here; screen readers must not be blocked from a focused element

      // Make TH focusable & interactive
      if (filterable) {
        th.setAttribute("tabindex", "0");
        th.setAttribute("role", "button");
        th.setAttribute("aria-haspopup", "menu");
        (th as HTMLElement).style.cursor = "pointer";
      } else {
        th.setAttribute("tabindex", "0");
        th.setAttribute("role", "columnheader");
        th.removeAttribute("aria-haspopup");
        (th as HTMLElement).style.cursor = "default";
      }
      const openMenu = (e: Event | KeyboardEvent) => {
        // Avoid interfering with resize handles etc. (adjust selector if needed)
        if ((e.target as HTMLElement)?.closest(".k-column-resizer")) return;

        activeFilterButton.value = th as HTMLElement; // focus return target
        btn.click();
      };

      const clickHandler = (e: Event) => {
        if (filterable) {
          activeFilterButton.value = th as HTMLElement;
          e.preventDefault();
          e.stopPropagation();
          openMenu(e); // Only open the menu, do not sort
        } else if (sortable) {
          // no menu; directly sort; like <Enter> key
          activeFilterButton.value = th as HTMLElement;
          // use keyboard event to simulate <Enter> key to prevent max call stack
          const kbe = new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
          });
          // send Enter key
          th.dispatchEvent(kbe);
        }
      };
      (th as HTMLElement).addEventListener("click", clickHandler);
      headerThTeardownCallbacks.push(() => {
        (th as HTMLElement).removeEventListener("click", clickHandler);
      });

      const keyHandler = (e: KeyboardEvent) => {
        if ((e.code === "Enter" || e.code === "Space") && (filterable || sortable)) {
          activeFilterButton.value = th as HTMLElement;
          activeFilterButton.value.focus();
          if (filterable) {
            e.preventDefault();
            e.stopPropagation();
            openMenu(e);
          } else if (sortable) {
            // use mouse click method from keyHandler to avoid max call stack
            const columnLink = th.querySelector(".k-link");
            if (columnLink) {
              (columnLink as HTMLElement).click();
            }
          }
        }
      };
      // Always add listeners to block default Kendo behavior
      (th as HTMLElement).addEventListener("keydown", keyHandler, true);
      headerThTeardownCallbacks.push(() => {
        (th as HTMLElement).removeEventListener("keydown", keyHandler, true);
      });
    });

    const thead = document.querySelector(".k-grid-header .k-table-thead");
    if (thead) {
      // NOTE:  Adds a keydown listener to the thead to block Kendo's event
      // NOTE:  This prevents sortable=false and filterable=false from triggering
      // the menu or sorting behavior while still being tabbable
      const theadKeyboardHandler = (e: KeyboardEvent) => {
        const th = (e.target as HTMLElement).closest("th");
        if (!th) return;
        if (
          (e.code === "Enter" || e.code === "Space") &&
          th.dataset.featherKFilterable === "false" &&
          th.dataset.featherKSortable === "false"
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      };
      // NOTE: 3rd parameter is to capture the event (effectively preventing default Kendo event)
      (thead as HTMLElement).addEventListener(
        "keydown",
        theadKeyboardHandler,
        true // NOTE: capture phase
      );
      headerThTeardownCallbacks.push(() => {
        (thead as HTMLElement).removeEventListener("keydown", theadKeyboardHandler, true);
      });
    }
  };

  // NOTE: Custom sortChange handler to manage interactions between
  // sorting and opening the column menu
  // NOTE: a GridSortChangeEvent is triggered
  //  - when the user clicks a column header to open its menu and
  //  - when a menu item is selected to apply sorting
  // TODO: May need to handle sortable only or filterable only action here as well
  const handleSortChange = function (event: GridSortChangeEvent, customHandler?: any) {
    const srcEl = event.event.event.srcElement as HTMLElement;
    const columns = getColumns();
    if (!srcEl || !columns) return;

    const menuOpened = srcEl.classList.contains("k-link");
    const menuItemSelected = srcEl.classList.contains("k-columnmenu-item");

    // const isPointerEvent = event.event.event instanceof PointerEvent;
    const fieldIsSortable = columns.find((c) => c.field === event.event.field)?.sortable && true;

    // NOTE: Opening the menu should not trigger sorting
    if (menuOpened) return;

    if (menuItemSelected && !fieldIsSortable) {
      // NOTE: Remove sort for current field when clicking the menu item if current field is not sortable
      const sortDescriptor = event.event.sort && undefined;
      sortDescriptor?.filter((s: SortDescriptor) => s.field !== event.event.field);
      // NOTE: Non sortable field, so remove sortDescriptor; do not trigger sort; do not call customHandler
      return;
    }
    // This is a legitimate sort change event; fire custom event if provided
    if (typeof customHandler === "function") {
      nextTick(() => {
        // Set focus before customHandler (in case consumer wants to change focus in customHandler)
        if (activeFilterButton.value) activeFilterButton.value.focus();
        customHandler(event);
      });
    }
  };

  onMounted(() => {
    setupGridStyling();
    setupTrNavigation();
    setupFilterButtonAccessibility();
  });

  onBeforeUnmount(() => {
    cleanupFilterButtonAccessibility();
  });

  return {
    activeFilterButton,
    handleGridKeyDown,
    handleSortChange,
  };
};
