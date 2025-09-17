/**
 * useGridAccessibility
 *
 * Composable that augments a Kendo-based grid with accessible keyboard navigation,
 * focus management, and custom behaviors for column header menus (filter/sort).
 *
 */

import { ref, nextTick, onMounted, onBeforeUnmount, type Ref } from "vue";
import type { SortDescriptor } from "@progress/kendo-data-query";
import type {
  GridColumnProps,
  GridSortChangeEvent,
} from "@progress/kendo-vue-grid";

export const useGridAccessibility = (gridRef: Ref<any>) => {
  // Reference to the active filter button for focus management
  const activeFilterButton = ref<HTMLElement | null>(null);

  // Mutation observer for dynamic elements
  let mutationsObserver: MutationObserver | null = null;
  // Observer to watch row changes within this grid instance so we can reassert tabindex
  let rowObserver: MutationObserver | null = null;

  const headerThTeardownCallbacks: Array<() => void> = [];

  const intraRowNavigationSelector =
    ".k-table-row[data-grid-row-index] [tabindex]";

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
    if (!activeFilterButton.value) return;
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      if (activeFilterButton.value) {
        activeFilterButton.value.focus();
      }
      return;
    }

    const menuItems = Array.from(
      document.querySelectorAll(
        ".k-animation-container .k-popup .k-column-menu .k-columnmenu-item-wrapper .k-columnmenu-item"
      )
    ) as HTMLElement[];

    const filterContainer = document.querySelector(".k-filter-menu-container");

    if (filterContainer) {
      if (event.code === "Tab") {
        const focusableSelectors = [
          ".k-filter-menu-container .k-dropdownlist[tabindex='0']",
          ".k-filter-menu-container input.k-input-inner:not([tabindex='-1']):not([disabled])",
          ".k-filter-menu-container button:not([tabindex='-1']):not([disabled])",
        ];
        const focusableElements = Array.from(
          filterContainer.querySelectorAll(focusableSelectors.join(","))
        ) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const focusedIndex = focusableElements.findIndex(
          (el) => el === document.activeElement
        );
        let targetIndex: number;
        if (focusedIndex === -1) {
          targetIndex = 0;
        } else if (event.shiftKey) {
          targetIndex =
            (focusedIndex - 1 + focusableElements.length) %
            focusableElements.length;
        } else {
          targetIndex = (focusedIndex + 1) % focusableElements.length;
        }

        event.preventDefault();
        event.stopPropagation();

        focusableElements[targetIndex]?.focus();
        return;
      }
    } else {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();

        const focusedIndex = menuItems.findIndex(
          (item) => item === document.activeElement
        );

        let targetIndex = focusedIndex;
        if (event.code === "ArrowUp") {
          targetIndex =
            focusedIndex > 0 ? focusedIndex - 1 : menuItems.length - 1;
        } else if (event.code === "ArrowDown") {
          targetIndex =
            focusedIndex < menuItems.length - 1 ? focusedIndex + 1 : 0;
        }

        menuItems[targetIndex]?.focus();
        return;
      }
    }

    if (event.code === "Tab") {
      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        (
          activeFilterButton.value?.previousElementSibling as HTMLElement
        ).focus();
      } else {
        (activeFilterButton.value?.nextElementSibling as HTMLElement).focus();
      }
    }
  };

  const setupFilterMenuObserver = () => {
    mutationsObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.classList.contains("k-animation-container")) {
              const column = activeFilterButton.value as HTMLElement;
              if (column) {
                const sortable = column.dataset.featherKSortable === "true";
                if (!sortable) {
                  nextTick(() => {
                    const wrappers = element.querySelectorAll(
                      ".k-columnmenu-item-wrapper"
                    );
                    wrappers.forEach((wrapper) => {
                      const sortMenu = wrapper.textContent
                        ?.toLowerCase()
                        .includes("sort");
                      if (sortMenu) {
                        wrapper.remove();
                      }
                    });
                  });
                }
              }
              element.addEventListener(
                "keydown",
                handleFilterMenuKeyboardListener
              );
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
                    (tryFocusMenuItem as any).attempts = 0; // reset attempts
                    return;
                  } else {
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

            const animationContainers = element.querySelectorAll(
              ".k-animation-container"
            );
            animationContainers.forEach((container) => {
              (container as HTMLElement).addEventListener(
                "keydown",
                handleFilterMenuKeyboardListener
              );
            });
          }
        });

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            if (element.classList.contains("k-animation-container")) {
              element.removeEventListener(
                "keydown",
                handleFilterMenuKeyboardListener
              );
            }

            const animationContainers = element.querySelectorAll(
              ".k-animation-container"
            );
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

    mutationsObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const handleGridKeyDown = (e: KeyboardEvent) => {
    if (!e.type) return;

    if (!e) {
      return;
    }
    console.log("handleGridKeyDown", e, e.code);
    const target = e.target as HTMLElement;
    if (!target) return;

    if (
      [
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "Enter",
        "Space",
      ].includes(e.code)
    ) {
      e.preventDefault();

      if (
        target.classList.contains("k-grid-header-menu") &&
        target.classList.contains("k-grid-column-menu")
      ) {
        activeFilterButton.value = target as HTMLElement;
        return;
      }

      // If event came from within a data row?
      const row = (target as HTMLElement).closest(
        ".k-table-row[data-grid-row-index]"
      ) as HTMLElement | null;

      if (row) {
        if (["ArrowDown", "ArrowUp"].includes(e.code)) {
          let targetRow: Element | null = null;
          if (e.code === "ArrowDown") {
            targetRow = row.nextElementSibling;
          } else if (e.code === "ArrowUp") {
            targetRow = row.previousElementSibling;
          }

          if (targetRow && targetRow.hasAttribute("tabindex")) {
            row.setAttribute("tabindex", "-1");
            (targetRow as HTMLElement).setAttribute("tabindex", "0");
            (targetRow as HTMLElement).focus();
          }
          return;
        }
        if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
          e.preventDefault();

          const tabbable = row.querySelectorAll(
            intraRowNavigationSelector
          ) as NodeListOf<HTMLElement>;
          if (tabbable.length === 0) return;

          // Find currently focused element within the row
          let currentIndex = Array.from(tabbable).findIndex(
            (el) => el === document.activeElement
          );

          if (currentIndex === -1 && document.activeElement === row) {
            // If no element is focused, focus the first tabbable element
            (tabbable[0] as HTMLElement).focus();
            return;
          }

          if (e.code === "ArrowRight") {
            currentIndex =
              currentIndex === tabbable.length - 1 ? 0 : currentIndex + 1;
          } else if (e.code === "ArrowLeft") {
            currentIndex =
              currentIndex === tabbable.length - 1
                ? currentIndex - 1
                : tabbable.length - 1;
          }
          (tabbable[currentIndex] as HTMLElement).focus();

          return;
        }
      }
    }
  };

  const setupGridStyling = () => {
    nextTick(() => {
      const gridElement = gridRef.value.$el.closest(".k-grid") as HTMLElement;
      if (gridElement) gridElement.classList.add("fk-grid");
    });
  };

  const setupTrNavigation = () => {
    try {
      const ensureSingleTabindex = () => {
        try {
          const rows = Array.from(
            gridRef.value.$el.querySelectorAll(
              ".k-table-row[data-grid-row-index]"
            ) as HTMLElement[]
          );

          if (!rows || rows.length === 0) return;

          // Count rows that currently have tabindex="0"
          const zeroTabRows = rows.filter(
            (r) => r.getAttribute("tabindex") === "0"
          );

          // If exactly one row already has tabindex=0, nothing to do
          if (zeroTabRows.length === 1) return;

          // Prefer to preserve the currently focused row if it's inside the rows
          const focusedRow = rows.find(
            (r) =>
              r === document.activeElement || r.contains(document.activeElement)
          );

          // Clear all to -1
          rows.forEach((r) => r.setAttribute("tabindex", "-1"));

          if (focusedRow) {
            focusedRow.setAttribute("tabindex", "0");
            return;
          }

          // Fallback: set first row to tabindex=0
          rows[0].setAttribute("tabindex", "0");
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("ensureSingleTabindex error:", err);
        }
      };

      // Initial setup
      const rows = Array.from(
        gridRef.value.$el.querySelectorAll(
          ".k-table-row[data-grid-row-index]"
        ) as HTMLElement[]
      );
      if (rows.length > 0) {
        rows.forEach((row, index) => {
          row.setAttribute("tabindex", index === 0 ? "0" : "-1");
        });
      }

      // Observe tbody for row changes (Kendo will recreate rows on sort/filter/paging)
      const tbody = gridRef.value.$el.querySelector(".k-table-tbody");
      if (tbody) {
        rowObserver = new MutationObserver(() => {
          // Reassert single tabindex after DOM changes. Keep work minimal.
          ensureSingleTabindex();
        });
        rowObserver.observe(tbody, { childList: true, subtree: true });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error setting up row navigation:", error);
    }
  };

  const setupFilterButtonAccessibility = () => {
    nextTick(() => {
      const filterSelector =
        ".k-grid-header .k-grid-header-menu.k-grid-column-menu";
      const filterButtons = document.querySelectorAll(filterSelector);
      if (filterButtons) {
        filterButtons.forEach((el) => {
          el.setAttribute("role", "button");
          (el as HTMLElement).addEventListener(
            "keydown",
            handleFilterButtonKeyboardListener
          );
        });
      }

      setupFilterMenuObserver();

      setupHeaderThTriggers();
    });
  };

  const cleanupFilterButtonAccessibility = () => {
    const filterSelector =
      ".k-grid-header .k-grid-header-menu.k-grid-column-menu";
    const filterButtons = document.querySelectorAll(filterSelector);
    if (filterButtons) {
      filterButtons.forEach((el) => {
        (el as HTMLElement).removeEventListener(
          "keydown",
          handleFilterButtonKeyboardListener
        );
      });
    }

    if (mutationsObserver) {
      mutationsObserver.disconnect();
      mutationsObserver = null;
    }

    if (rowObserver) {
      rowObserver.disconnect();
      rowObserver = null;
    }

    headerThTeardownCallbacks.forEach((teardown) => teardown());
    headerThTeardownCallbacks.length = 0;
  };

  const setupHeaderThTriggers = () => {
    const headerCells = document.querySelectorAll(
      ".k-grid-header .k-table-thead th"
    );

    headerCells.forEach((th, index) => {
      const btn = th.querySelector(
        ".k-grid-header-menu.k-grid-column-menu"
      ) as HTMLElement | null;
      if (!btn) return;

      const columns = getColumns();

      if (columns && columns[index]) {
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
      }

      const filterable =
        (th as HTMLElement).dataset.featherKFilterable !== "false";
      const sortable = (th as HTMLElement).dataset.featherKSortable !== "false";

      btn.setAttribute("tabindex", "-1");

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
        if ((e.target as HTMLElement)?.closest(".k-column-resizer")) return;

        activeFilterButton.value = th as HTMLElement; // focus return target
        btn.click();
      };

      const clickHandler = (e: Event) => {
        if (filterable) {
          activeFilterButton.value = th as HTMLElement;
          e.preventDefault();
          e.stopPropagation();
          openMenu(e);
        } else if (sortable) {
          activeFilterButton.value = th as HTMLElement;
          const kbe = new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
          });
          th.dispatchEvent(kbe);
        }
      };
      (th as HTMLElement).addEventListener("click", clickHandler);
      headerThTeardownCallbacks.push(() => {
        (th as HTMLElement).removeEventListener("click", clickHandler);
      });

      const keyHandler = (e: KeyboardEvent) => {
        if (
          (e.code === "Enter" || e.code === "Space") &&
          (filterable || sortable)
        ) {
          activeFilterButton.value = th as HTMLElement;
          activeFilterButton.value.focus();
          if (filterable) {
            e.preventDefault();
            e.stopPropagation();
            openMenu(e);
          } else if (sortable) {
            const columnLink = th.querySelector(".k-link");
            if (columnLink) {
              (columnLink as HTMLElement).click();
            }
          }
        }
      };
      (th as HTMLElement).addEventListener("keydown", keyHandler, true);
      headerThTeardownCallbacks.push(() => {
        (th as HTMLElement).removeEventListener("keydown", keyHandler, true);
      });
    });

    const thead = document.querySelector(".k-grid-header .k-table-thead");
    if (thead) {
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
      (thead as HTMLElement).addEventListener(
        "keydown",
        theadKeyboardHandler,
        true // NOTE: capture phase
      );
      headerThTeardownCallbacks.push(() => {
        (thead as HTMLElement).removeEventListener(
          "keydown",
          theadKeyboardHandler,
          true
        );
      });
    }
  };

  const handleSortChange = function (
    event: GridSortChangeEvent,
    customHandler?: any
  ) {
    const srcEl = event.event.event.srcElement as HTMLElement;
    const columns = getColumns();
    if (!srcEl || !columns) return;

    const menuOpened = srcEl.classList.contains("k-link");
    const menuItemSelected = srcEl.classList.contains("k-columnmenu-item");

    const fieldIsSortable =
      columns.find((c) => c.field === event.event.field)?.sortable && true;

    if (menuOpened) return;

    if (menuItemSelected && !fieldIsSortable) {
      const sortDescriptor = event.event.sort && undefined;
      sortDescriptor?.filter(
        (s: SortDescriptor) => s.field !== event.event.field
      );
      return;
    }
    if (typeof customHandler === "function") {
      nextTick(() => {
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
