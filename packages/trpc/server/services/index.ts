import UserService from "@repo/services/user";

export const userService = new UserService();

//form service importing and exporting an object of that form service
import FormService from '@repo/services/form';
export const formService = new FormService();


// importing formfieldservice and create an object and export them
import FormFieldService from '@repo/services/form-field';
export const formFieldService = new FormFieldService();
