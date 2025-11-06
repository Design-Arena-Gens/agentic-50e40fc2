'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'

export default function Home() {
  const [formData, setFormData] = useState({
    employeeName: '',
    ebNumber: '',
    departmentDesignation: '',
    loanAmount: '',
    loanReason: 'House Construction',
    mobileNumber: ''
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatCurrency = (amount: string) => {
    if (!amount) return ''
    const num = parseFloat(amount.replace(/,/g, ''))
    return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
  }

  const generateLetterText = () => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

    return `Date: ${today}

To,
The Labour Officer
Anglo India Jute & Textile Industries Pvt. Ltd.
West Ghoshpara Road, Jagaddal,
North 24 Parganas

Subject: Request for Non-Refundable Loan Withdrawal against PF

Respected Sir/Madam,

I, ${formData.employeeName}, EB Number ${formData.ebNumber}, working as ${formData.departmentDesignation} in your esteemed organization, would like to request for a non-refundable loan withdrawal from my Provident Fund account.

I kindly request you to approve a loan amount of ${formatCurrency(formData.loanAmount)} for ${formData.loanReason.toLowerCase()}.

I assure you that I will comply with all the necessary formalities and submit all required documents for the loan processing. I request you to kindly consider my application and grant the loan at the earliest.

Employee Details:
Name: ${formData.employeeName}
EB Number: ${formData.ebNumber}
Department & Designation: ${formData.departmentDesignation}
Loan Amount Required: ${formatCurrency(formData.loanAmount)}
Purpose: ${formData.loanReason}
Mobile Number: ${formData.mobileNumber}

Thanking you in anticipation.

Yours faithfully,

${formData.employeeName}
EB No: ${formData.ebNumber}
Mobile: ${formData.mobileNumber}`
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    const letterText = generateLetterText()

    // Split text into lines and add to PDF
    const lines = doc.splitTextToSize(letterText, 180)
    doc.setFontSize(11)
    doc.text(lines, 15, 15)

    doc.save(`PF_Loan_Application_${formData.ebNumber || 'draft'}.pdf`)
  }

  const isFormValid = () => {
    return formData.employeeName &&
           formData.ebNumber &&
           formData.departmentDesignation &&
           formData.loanAmount &&
           formData.mobileNumber
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-2">
            PF Loan Application Generator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Anglo India Jute & Textile Industries Pvt. Ltd.
          </p>

          {/* Form Section */}
          <div className="space-y-5">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h2 className="font-semibold text-indigo-900 mb-2">Fixed Information</h2>
              <p className="text-sm text-gray-700">To: The Labour Officer</p>
              <p className="text-sm text-gray-700">Company: Anglo India Jute & Textile Industries Pvt. Ltd.</p>
              <p className="text-sm text-gray-700">Address: West Ghoshpara Road, Jagaddal, North 24 Parganas</p>
              <p className="text-sm text-gray-700">Subject: Request for Non-Refundable Loan Withdrawal against PF</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EB Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ebNumber"
                value={formData.ebNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter EB number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department & Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="departmentDesignation"
                value={formData.departmentDesignation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g. Production Department - Supervisor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g. 100000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Reason <span className="text-red-500">*</span>
              </label>
              <select
                name="loanReason"
                value={formData.loanReason}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="House Construction">House Construction</option>
                <option value="Medical Treatment">Medical Treatment</option>
                <option value="Children's Education">Children's Education</option>
                <option value="Daughter's Marriage Expenses">Daughter's Marriage Expenses</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                disabled={!isFormValid()}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {showPreview ? 'Hide Preview' : 'Preview Letter'}
              </button>
              <button
                onClick={downloadPDF}
                disabled={!isFormValid()}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Download as PDF
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && isFormValid() && (
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Letter Preview</h2>
              <div className="bg-white p-6 rounded border border-gray-300 font-mono text-sm whitespace-pre-wrap">
                {generateLetterText()}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} Anglo India Jute & Textile Industries Pvt. Ltd.
        </footer>
      </div>
    </main>
  )
}
