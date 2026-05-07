I need to build a new .xlsx workbook for a commercial real estate ("CRE") underwriting ("UW") acqusition model based on the Offering Memorandum ("OM") here :______

First inspect the OM at low depth using text and vision, gatherining minimal necessary context to groud yourself on the contents therein. 
Then plan and spawn 2-3 subagents w/ vision capabilties to parse key infomration from the OM necessary to build a full UW model, as well as a review and synthesize subagent to review and organize subagent extractions into a clean data artifact. 

Once subagents are spawned, start building a new dynamic .xlsx UW model in the working directory for the CRE asset in OM file.  
The final model workbook should be 5-7 sheets in total and be extremely skimmable for an Executive Level audience, as well as traceable and auditable with clear driving assumptions, and use well thought out visual design taste for a clean aethetic for presentation. 
There must be a dedicated sheet for extracted data from the OM (with clear citations) and a Master Input Sheet for assumptions that dynamically drive model output.
Input assumptions must include : 
 -Purchase Price (entered either manually or utilizing toggle with seperate input fields for either psf price or Cap Rate which would calculate Purchase Price) 
 -Closing Costs (as % of Purchase Price)
 -Other Acquisition Costs (Manual hardcoded input)
 -Financing Stack (debt vs. equity split, GP/LP split, lender interest rate, IO period, amortization years, post closing funding allowances, sunset dates, and buckets {i.e. Capex vs. LC vs. TI. future lender allowances), 
 -Leasing assumptions through full hold period including termination dates, escalations, renewals, lease types (i.e. recovery income : NNN, Gross w/ base year allowance, etc. ), Leasing Commissions (psf or % revenue terms), and Tenant Improvement Allowances/Costs (psf terms)
 -Capex assumptions with period start/period end logic 
 -Opex assumptions and opex growth rates
 -Hold Period and Exit Assumptions (Exit Cap rate, etc.)
 -Anything else needed for world class comprehensive CRE model.
 
 Other sheets needed are : 
  -'Calculation' Sheet (as helper for staging calcs) 
  -'Model' Sheet (horizontally configured time series by month with summary level detail {NOI, Leasing Costs - TI/LC, Capex, Interest Expense, Principal Payments, etc.} to Levered Cash Flow, Equity Contribution/Distribution or Lender Funding Required, and Cash/Debt Balance Tracking) 
  -'Waterfall' Sheet (GP/LP split) 
  -'Summary' Sheet (key Executive level KPI Summary - "tearsheet", which includes thoughtfully curated chart/graph selections in a Dashboard like format that can be printed to 1 page easily)
  -'Check' Sheet (with intelligent and logical check formula's in "TRUE/FALSE" outputs.
  
 **Use conventional IB formatting across all sheets in the new workbook**
 **Replace all actual addresses or potentially senstive names from OM with synthetic names in workbook, but keep all facts and property data the same**
 
 When subagents are completed with parsing OM, emit extractions to workbook and where appropriate link Input fields to extractions. Then run comprehensive tests on other input fields to ensure workbook is fully functional and dynamic, and then output'ed results are reasonable and make sense in the context of CRE UW. 
 If tests fail, review failure, then keep iterating until fixed and full workbook passes all tests. 