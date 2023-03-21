import { regexMail, regexPhone } from "@/views/login-and-reg/helpers/regex.intex";

export class ValidateForm {
  public static validPhoneEmail = (value: string | number): boolean => {
    return !!value.toString().match(regexPhone) || !!value.toString().match(regexMail);
  };
}
