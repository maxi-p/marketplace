/** Tests for the register Component
 * phoneValidate
 * dePhoneify
 * passValidate
 */

import R_Validation_Data from "../logic/RegisterValidation";




/* Phone Validation Test
 *
 * Takes in a integer/intString, returns True if its a valid phone number.
 * Return False Otherwise
 * (US Only Currently)
 */
const PNV = [
    {Number: null, Retval: false, name:"Null Value Test"},
    {Number: "textString", Retval: false, name:"Non-number test"},
    {Number: "", Retval: false, name:"Null Value Test"},
    {Number: 12345, Retval: false, name:"Too Small Value"},
    {Number: 12345678901, Retval: false, name:"Too Large Value (US Only)"},
    {Number: 1234567890, Retval: true, name:"Correct"},
    {Number: "1234567890", Retval: true, name:"Correct"},
    {Number: 1258968745, Retval: true, name:"Correct Random test 1"},
    {Number: 5896857496, Retval: true, name:"Correct Random test 2"},
    {Number: 8599687485, Retval: true, name:"Correct Random test 3"},
    {Number: "2365698754", Retval: true, name:"Correct Random test 4 "},
    {Number: "5969874896", Retval: true, name:"Correct Random test 5 "},
    {Number: "2596985962", Retval: true, name:"Correct Random test 6 "},
    {Number: "123 456 7893", Retval: true, name:"FormattingTest 1"},
    {Number: "(123) 456-7893", Retval: true, name:"FormattingTest 2"},
    {Number: "(123)456 7893", Retval: true, name:"FormattingTest 3"},
    {Number: "123-456-7893", Retval: true, name:"FormattingTest 4"},
    {Number: "123.456.7893", Retval: true, name:"FormattingTest 5"},
    {Number: "258 963-2587", Retval: true, name:"FormattingTest 6"},
];

describe("validatePhone", () => {
    for (let t of PNV) {
        test(t.name, () => {
            expect(R_Validation_Data.validatePhone(t.Number)).toBe(t.Retval);
        });
    }
});

/* dePhoneify Validation Test
 *
 * Converts a formatted phone number into a 10 digit string
 * All phone number inputs pass phone validation
 */
const dPY = [
    {Number: "123 456 7893", Retval: "1234567893", name:"FormattingTest 1"},
    {Number: "(123) 456-7893", Retval: "1234567893", name:"FormattingTest 2"},
    {Number: "(123)456 7893", Retval: "1234567893", name:"FormattingTest 3"},
    {Number: "123-456-7893", Retval: "1234567893", name:"FormattingTest 4"},
    {Number: "123.456.7893", Retval: "1234567893", name:"FormattingTest 5"},
    {Number: "+258 963-2587", Retval: "2589632587", name:"FormattingTest 6"},
    {Number: "(236569 8754", Retval: "2365698754", name:"FormattingTest 7"},
    {Number: "596987-4896", Retval: "5969874896", name:"FormattingTest 8"},
    {Number: "259).698-5962", Retval: "2596985962", name:"FormattingTest 9"},
];

describe("dePhoneify", () => {
    for (let t of dPY) {
        test(t.name, () => {
            expect(R_Validation_Data.dePhoneify(t.Number)).toBe(t.Retval);
        });
    }
});
/* username Validation Test 
 *
 * The username must be 4-18 characters long, only include alphanumberic charachters alongside
 * - and _, and must start with an alpabetic character
 **/
const UN = [
    {uname: "TestUsername", Retval: true, name: "CorrectTest"},
    {uname: null, Retval: false, name: "Null Test"},
    {uname: "9TestUsername", Retval: false, name: "Starts with number"},
    {uname: "Test98_Name", Retval: true, name: "Allowed Characters"},
    {uname: "T$est!Abc", Retval: false, name: "Rejected Characters"},
    {uname: "ab", Retval: false, name: "Too Short"},
    {uname: "asdthugfdxpoliuyhtiws", Retval: false, name: "Too Long"},
    {uname: "", Retval: false, name: "Empty"},
];

describe("username Validation", () => {
    for (let t of UN) {
        test(t.name, () => {
            expect(R_Validation_Data.validateUserName(t.uname)).toBe(t.Retval);
        });
    }
});

/* Password Validation Test 
 *
 * Passwords must be 8-32 long, with at least 1 digit, 1 letter, 1 special character.
 **/
const PWD = [
    {pass: "password123!!", Retval: true, name: "CorrectTest"},
    {pass: null, Retval: false, name: "Null Test"},
    {pass: "1234567892", Retval: false, name: "All Numbers"},
    {pass: "TestTestTest", Retval: false, name: "All Letters"},
    {pass: "!!!@@@!!!@@@", Retval: false, name: "All Special Characters"},
    {pass: "ab4de", Retval: false, name: "Too Short"},
    {pass: "ABCDEFGHIJKLMNOPQRSTUVWXYZASDFGHJK8QWE!TYU", Retval: false, name: "Too Long"},
    {pass: "", Retval: false, name: "Empty"},
];

describe("Password Validation", () => {
    for (let t of PWD) {
        test(t.name, () => {
            expect(R_Validation_Data.validatePassword(t.pass)).toBe(t.Retval);
        });
    }
});