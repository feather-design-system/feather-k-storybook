<template>
  <div>
    <h1>Login Info</h1>

    <FormElement>
      <fieldset>
        <Field
          :id="'username'"
          :name="'username'"
          :label="'User Name'"
          :placeholder="'Enter your username'"
          :component="'myTemplate'"
          :validator="userNameValidatorRef"
          class="app-form-input"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            />
          </template>
        </Field>
        <Field
          :id="'email'"
          :name="'email'"
          :label="'Email'"
          :placeholder="'Enter your email address'"
          :hint="'Hint: Enter your personal email address'"
          :component="'myTemplate'"
          :validator="emailValidatorRef"
          class="app-form-input"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
              @change="props.onChange"
              @focus="props.onFocus"
              @blur="props.onBlur"
            />
          </template>
        </Field>
        <Field
          :id="'password'"
          :name="'password'"
          :label="'Password'"
          :placeholder="'Enter your password'"
          :component="'myTemplate'"
          :type="'password'"
          :hint="'Password must be at least 8 characters long'"
          :validator="passwordValidatorRef"
          class="app-form-input"
        >
          <template #myTemplate="{ props }">
            <FormInput
              v-bind="props"
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
import {
  emailValidator,
  passwordValidator,
  userNameValidator,
} from "./validator.ts";

const userNameValidatorRef = ref(userNameValidator);
const emailValidatorRef = ref(emailValidator);
const passwordValidatorRef = ref(passwordValidator);
</script>

<style scoped>
fieldset {
  border: none;
}
</style>
