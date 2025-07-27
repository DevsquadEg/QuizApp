/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseFormWatch } from "react-hook-form"


/*********************** fIRST Name *******************************************************/ 
export const FIRST_NAME_VALIDATION = {required:"First Name Is Required",pattern:{
                        value:/^[A-Za-z][A-Za-z0-9]{2,7}$/ ,
                        message:"Must Start with letter and not less than 3 and not increase 8 And Must Have Number"
                      }}



/*********************** last Name *******************************************************/ 


 export const LAST_NAME_VALIDATION = {required:"Last Name Is Required"} 




 /*********************** Email *******************************************************/ 

 
 export const EMAIL_VALIDATION = {required:"Email is Required",pattern:{
                        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:"Invalid Email"

                      }}





 /*********************** Role *******************************************************/ 

 export const ROLE_VALIDATION = {required:"Role Is Required"} 
 
 


 /*********************** Password *******************************************************/ 

 export const PASSWORD_VALIDATION = {required:"Password Is Required",pattern:{
                        value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                        message:"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"


                      }}



 /*********************** New Password *******************************************************/ 

export const NEW_PASSWORD_VALIDATION = (watch: UseFormWatch<any>) => ({
  required: "Password is required",
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message:
      "Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character",
  },
  validate: (value: string) =>
    value !== watch("password") || "New password must be different",
});






 /*********************** OTP *******************************************************/ 

export const OTP_VALIDATION = {required:"Otp Is Required",pattern:{value:/[a-zA-Z0-9]{6}/,message:"Otp Is 6 Characters"}}                


 /*********************** Group Module *******************************************************/ 

export const GROUP_MODULE = {
  NAME:{required:"Group Name Is Required",pattern:{
              value:/^[A-Za-z].*/,
              message:"Group Name Must Start With Letter"
            }},
  STUDENTS:{required:"Must Select At Least One Student"},
}


