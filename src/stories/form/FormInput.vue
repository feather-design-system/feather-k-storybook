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
          :valid="valid"
          :id="id"
          :disabled="disabled"
          :placeholder="placeholder"
          :type="type"
          :value="value"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <Error v-if="showValidationMessage" :id="errorId">{{
          validationMessage
        }}</Error>
        <Hint v-else :id="hintId">{{ hint }}</Hint>
      </div>
    </FieldWrapper>
  </div>
</template>

<script lang="ts" setup>
import { FieldWrapper } from "@progress/kendo-vue-form";
import { Error, Hint, Label } from "@progress/kendo-vue-labels";
import { Input } from "@progress/kendo-vue-inputs";
import { computed } from "vue";

const props = defineProps({
  optional: Boolean,
  disabled: Boolean,
  placeholder: String,
  touched: Boolean,
  label: String,
  validationMessage: String,
  hint: String,
  id: { type: String, required: true },
  valid: Boolean,
  value: {type: String, default: ""},
  type: { type: String, default: "text" },
});

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

const handleInput = (e: Event) => {
  emit("input", e);
};

const handleChange = (e: Event) => {
  emit("change", e);
};

const handleFocus = (e: Event) => {
  emit("focus", e);
};

const handleBlur = (e: Event) => {
  emit("blur", e);
};
</script>

<style scoped></style>
