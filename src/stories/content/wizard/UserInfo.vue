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
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              :value="firstName"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            >
              {{ "First Name" }}
            </FormInput>
          </template>
        </Field>
        <Field
          :id="'lastName'"
          :name="'lastName'"
          :label="'Last Name'"
          :placeholder="'Enter your last name'"
          :component="'myTemplate'"
          :validator="requiredValidatorRef"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              :value="lastName"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            >
              {{ "Last Name" }}
            </FormInput>
          </template>
        </Field>
      </fieldset>
    </FormElement>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { Field, FormElement } from "@progress/kendo-vue-form";
import FormInput from "../../form/FormInput.vue";
// import { Button } from "@progress/kendo-vue-buttons";
import { requiredValidator } from "./validator.ts";

defineProps({
  firstName: String,
  lastName: String,
});

const requiredValidatorRef = ref(requiredValidator);

// @ts-ignore
const kendoForm = inject("kendoForm");

</script>

<style scoped>
  fieldset {
    border: none;
  }
</style>
