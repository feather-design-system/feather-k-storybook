<template>
  <div>
    <h1>User Info</h1>
    <p>Enter your personal information</p>
    <FormElement>
      <fieldset>
        <Field
          :id="'firstName'"
          :name="'firstName'"
          :label="'First Name'"
          :placeholder="'Enter your first name'"
          :component="'myTemplate'"
          :validator="requiredValidatorRef"
          class="app-form-input"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              @input="props.onChange"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            />
          </template>
        </Field>
        <Field
          :id="'lastName'"
          :name="'lastName'"
          :label="'Last Name'"
          :placeholder="'Enter your last name'"
          :component="'myTemplate'"
          :validator="requiredValidatorRef"
          class="app-form-input"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              @input="props.onChange"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            />
          </template>
        </Field>
      </fieldset>
    </FormElement>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Field, FormElement } from "@progress/kendo-vue-form";
import FormInput from "../../form/FormInput.vue";
import { requiredValidator } from "./validator.ts";

const requiredValidatorRef = ref(requiredValidator);
</script>

<style scoped>
fieldset {
  border: none;
}
</style>
