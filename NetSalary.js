// KRA Tax Bands for 2023 (Monthly)
const TAX_BRACKETS = [
    { min: 0, max: 24000, rate: 0.10 },
    { min: 24001, max: 32333, rate: 0.25 },
    { min: 32334, max: Infinity, rate: 0.30 }
];

// Personal Relief (Monthly)
const PERSONAL_RELIEF = 2400;

// NHIF Deduction Rates (Monthly)
const NHIF_RATES = [
    { min: 0, max: 5999, deduction: 150 },
    { min: 6000, max: 7999, deduction: 300 },
    { min: 8000, max: 11999, deduction: 400 },
    { min: 12000, max: 14999, deduction: 500 },
    { min: 15000, max: 19999, deduction: 600 },
    { min: 20000, max: 24999, deduction: 750 },
    { min: 25000, max: 29999, deduction: 850 },
    { min: 30000, max: 34999, deduction: 900 },
    { min: 35000, max: 39999, deduction: 950 },
    { min: 40000, max: 44999, deduction: 1000 },
    { min: 45000, max: 49999, deduction: 1100 },
    { min: 50000, max: 59999, deduction: 1200 },
    { min: 60000, max: 69999, deduction: 1300 },
    { min: 70000, max: 79999, deduction: 1400 },
    { min: 80000, max: 89999, deduction: 1500 },
    { min: 90000, max: 99999, deduction: 1600 },
    { min: 100000, max: Infinity, deduction: 1700 }
];

// NSSF Rates (Tier II - 2025)
const NSSF_RATE = 0.06;
const NSSF_UPPER_LIMIT = 18000; // Maximum pensionable earnings

/** 
  Calculates PAYE (Tax) based on gross salary
  @param {number} grossSalary - The gross salary
  @returns {number} - The calculated PAYE amount
**/
function calculatePAYE(grossSalary) {
    let annualTaxableIncome = grossSalary * 12;
    let annualTax = 0;
    let remainingIncome = annualTaxableIncome;
    
    // Calculate tax for each bracket
    for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
        const bracket = TAX_BRACKETS[i];
        
        if (annualTaxableIncome > bracket.min) {
            const taxableAmountInBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
            annualTax += taxableAmountInBracket * bracket.rate;
            remainingIncome -= taxableAmountInBracket;
        }
    }
    
    // Convert to monthly tax and apply personal relief
    let monthlyTax = annualTax / 12;
    monthlyTax = Math.max(0, monthlyTax - PERSONAL_RELIEF);
    
    return monthlyTax;
}

/**
 * Calculates NHIF Deduction based on gross salary
 * @param {number} grossSalary - The gross salary
 * @returns {number} - The NHIF deduction amount
 */
function calculateNHIF(grossSalary) {
    for (const rate of NHIF_RATES) {
        if (grossSalary >= rate.min && grossSalary <= rate.max) {
            return rate.deduction;
        }
    }
    
    // If gross salary is beyond the highest bracket, return the maximum deduction
    return NHIF_RATES[NHIF_RATES.length - 1].deduction;
}

/**
  Calculates NSSF Deduction based on pensionable pay
  @param {number} grossSalary - The gross salary
  @returns {number} - The NSSF deduction amount
 **/
function calculateNSSF(grossSalary) {
    const pensionablePay = Math.min(grossSalary, NSSF_UPPER_LIMIT);
    return pensionablePay * NSSF_RATE;
}

/**
 * Calculates Net Salary
 * @param {number} basicSalary - The basic salary
 * @param {number} benefits - The benefits amount
 * @returns {object} - An object containing all salary components
 */
function calculateNetSalary(basicSalary, benefits) {
    // Validate inputs
    if (basicSalary < 0 || benefits < 0) {
        throw new Error("Salary components cannot be negative");
    }
    
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;
    
    // Calculate deductions
    const payee = calculatePAYE(grossSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const nssfDeductions = calculateNSSF(grossSalary);
    
    // Calculate total deductions and net salary
    const totalDeductions = payee + nhifDeductions + nssfDeductions;
    const netSalary = grossSalary - totalDeductions;
    
    return {
        grossSalary: grossSalary,
        payee: payee,
        nhifDeductions: nhifDeductions,
        nssfDeductions: nssfDeductions,
        totalDeductions: totalDeductions,
        netSalary: netSalary
    };
}
// Calculate and log the net salary
const result = calculateNetSalary(50000, 10000)
console.log('Net Salary:' ,result.netSalary);
