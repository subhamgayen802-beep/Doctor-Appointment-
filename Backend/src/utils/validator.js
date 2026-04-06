const validator=require('validator');


const validate = (data)=>{


    const mandatoryField =['firstName','emailId','passWord'];
    const isAllowed =mandatoryField.every((k)=> Object.keys(data).includes(k));


    if(!isAllowed)
        throw new Error(' some field missing');
    if(!validator.isEmail(data.emailId))
        throw new Error('invalid email');
    if(!validator.isStrongPassword(data.passWord))
        throw new Error('week password');


}

module.exports =validate