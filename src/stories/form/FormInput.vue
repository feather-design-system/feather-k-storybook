<template>
  <div>
    <FieldWrapper>
      <Label
        :class="'k-form-label'"
        :editor-id="id"
        :editor-valid="valid"
        :disabled="disabled"
        :optional="optional"
      >
        {{ label }}
      </Label>
      <div class="k-form-field-wrap">
        <Input
          :id="id"
          :valid="valid"
          :disabled="disabled"
          :placeholder="placeholder"
          :type="type"
          :value="value"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <Error v-if="showValidationMessage" :id="errorId">
          {{ validationMessage }}
        </Error>
        <Hint v-else :id="hintId">
          {{ hint }}
        </Hint>
      </div>
    </FieldWrapper>
  </div>
</template>

<script lang="ts" setup>
import { FieldWrapper } from "@progress/kendo-vue-form";
import { Error, Hint, Label } from "@progress/kendo-vue-labels";
import { Input } from "@progress/kendo-vue-inputs";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    optional?: boolean;
    disabled?: boolean;
    placeholder?: string;
    touched?: boolean;
    label?: string;
    validationMessage?: string;
    hint?: string;
    id: string;
    valid?: boolean;
    value?: string;
    type?: string;
  }>(),
  {
    value: "",
    type: "text",
  }
);

const emit = defineEmits(["input", "change", "focus", "blur"]);

const showValidationMessage = computed(() => {
  return props.touched && props.validationMessage;
});

const showHint = computed(() => {
  return !props.touched && props.hint;
});

const hintId = computed(() => {
  return showHint.value ? `${props.id}-hint` : "";
});

const errorId = computed(() => {
  return showValidationMessage.value ? `${props.id}-error` : "";
});

const handleInput = (...args: unknown[]) => {
  emit("input", ...args);
};

const handleChange = (...args: unknown[]) => {
  emit("change", ...args);
};

const handleFocus = (...args: unknown[]) => {
  emit("focus", ...args);
};

const handleBlur = (...args: unknown[]) => {
  emit("blur", ...args);
};
</script>

<style scoped></style>
