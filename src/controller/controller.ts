import { Response } from "express";
import { CutomRequest } from '../middleware/auth';



export const requestHandler = async (req: CutomRequest, res: Response) => {
    try {
        let data = req.body.message;
        console.log(data);

        if (req.sender === "earth" && req.reciever === "mars") {
            if (/^[0-9. !@#]+$/.test(data)) {
                return res.status(400).send({ status: false, msg: "Invalid Message Type" });
            }
            const result = translate2Numeric(data.toUpperCase());
            return res.status(200).send({ data: result });
        }
        else if (req.sender === "mars" && req.reciever === "earth") {
            if (!/^[0-9. !@#]+$/.test(data)) {
                return res.status(400).send({ status: false, msg: "Invalid Message Type" });
            }
            const result = translate2Text(data);
            return res.status(200).send({ data: result });
        }
        else {
            return res.status(400).send({ msg: "Invalid Headers" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: error });
    }
};



interface DigitMapping {
    [key: string]: string;
}

export function translate2Numeric(input: string) {
    let output = "";
    // length of input string
    let n = input.length;

    let str: string[] = ["2", "22", "222",
        "3", "33", "333",
        "4", "44", "444",
        "5", "55", "555",
        "6", "66", "666",
        "7", "77", "777", "7777",
        "8", "88", "888",
        "9", "99", "999", "9999"
    ];

    for (let i = 0; i < n; i++) {
        // Checking for space
        if (input[i] == ' ') {
            output = output + " ";
        }
        else {
            let inputCode = input[i].charCodeAt(0);
            let refCode = "A".charCodeAt(0)

            let position = inputCode - refCode;
            if (i < n - 1 && getDigit(input[i]) == getDigit(input[i + 1])) {
                output = output + str[position] + ".";
            } else {
                output = output + str[position];
            }
        }
    }

    // Output sequence
    return output;
}

// function to identify keypad Digit for letters..
// Numeric string splitter helper function..
function getDigit(char: string): string {
    const digitMappings: DigitMapping = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    for (let digit in digitMappings) {
        if (digitMappings[digit].includes(char.toLowerCase())) {
            return digit;
        }
    }
    return '0';
}



export function translate2Text(S: string) {
    const str = S.split("");
    let i = 0;
    let message = "";

    while (i < str.length) {
        if (str[i] === '.') {
            i++;
            continue;
        }

        let count = 0;

        while (i + 1 < str.length && str[i] === str[i + 1]) {
            if ((count === 2 && ((str[i] >= '2' && str[i] <= '6') || str[i] === '8')) ||
                (count === 3 && (str[i] === '7' || str[i] === '9'))) {
                break;
            }

            count++;
            i++;

            if (i === str.length) {
                break;
            }
        }

        message = message + getLetterForKeypad(str[i], count);
        i++;
    }
    return message;;
}


function getLetterForKeypad(key: string, count: number) {
    const nums: string[] = ["", "", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"];

    const digitIndex = key.charCodeAt(0) - '0'.charCodeAt(0);

    if (digitIndex > 0 && digitIndex < nums.length) {

        if (key === '7' || key === '9') {
            return nums[digitIndex][count % 4];
        } else {
            return nums[digitIndex][count % 3];
        }
    } else {
        return " "
    }
}
