"use client"

import { useState } from "react";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What does the address check show?",
      answer:
        "The overall risk percentage is the probability that the address is associated with illegal activity. The sources of this risk are the known types of services with which the address has interacted and the percentage of funds accepted from / given to these services for which the overall risk is calculated.",
    },
    {
      question: "What do the parameters in the check results mean?",
      answer:
        "AMLBot checks the specified wallet address for connections to known blockchain services. AMLBot conventionally groups these services into groups with different levels of risk of illegal activity. The check shows the connections of the checked address to these groups as a percentage. Based on all the links, an average risk score is given, which helps the user to make further decisions about the assets.",
    },
    {
      question: "How do I understand risk assessment?",
      answer:
        "Each client determines for himself what percentage of risk is acceptable for him. Conventionally, the risk score can be divided as follows:\n- 0-25% is a clean wallet/transaction;\n- 25-75% is the average level of risk;\n- 75%+ such a wallet/transaction is considered risky.\nIt is also worth paying attention to the red sources of risk in the detailed analysis, described in page.",
    },
    {
      question: "How quickly is the balance replenished?",
      answer:
        "After transaction confirmation, the balance is replenished:\n- up to 10 minutes if payment was made within 24 hours after the invoice was issued,\n- up to 25 minutes if payment was made after 24 hours after the invoice issuance.\nOverall, BTC, ETH, USDT, and fiat are processed faster than other coins.",
    },
    {
      question: "What does the percentage risk score mean?",
      answer:
        "AMLBot finds links of a verified address to different users in the blockchain, each with a different conditional risk score.\nThe overall risk score is the average of all the components found. For example, if out of 2 BTC on the wallet being checked, 1 BTC came from mining (0% risk) and another 1 BTC from Darknet (100% risk), the risk score would be 50%.",
    },
    {
      question: "How does AMLBot help to protect you against blocking?",
      answer:
        "By checking counterparties' wallets before a transaction, you can reject their assets if the risk score is high. Also, before transferring funds to other services, you can check your wallet address and save the result (make a screenshot).\nIf the check shows that your assets had no connection with illegal activity and the service blocked you, you can provide the saved result to confirm the purity of your assets.",
    },
    {
      question: "The risk is higher than 50%, but I am certain that the address is reliable. What to do?",
      answer:
        "The verification results are based on international databases, which are constantly updated. So an address that had 0% risk yesterday may have received or given the asset to a risky counterparty today. In this case, the risk score will change. If you want to be sure of the result and determine what the cause of the high risk is, we can do a detailed check for you. To do so, email us at info@amlbot.com.",
    },
    {
      question: "What is the difference between an address and transaction checks?",
      answer:
        "Address (wallet) check is an analysis of all addresses ever associated with it, from which funds were received and to which funds were sent. Check transaction (you need to specify TxID) and then you select:\n- I received the funds (Recipient) and the address to which the funds were received (Deposit). In this case, the addresses from which the funds were received are checked. If you look at a transaction in the blockchain explorer, these are the addresses on the left and everyone they interacted with before the transaction.\n- I sent the funds (Sender) and the address to which the funds were sent to (Withdrawal). In this case, the wallet that received the funds is checked (it is on the right in the blockchain explorer), as well as all its connections before this transaction. Thus, when checking TxID, the risks for the recipient are checked if you choose receiving funds, and the risks for the sender if you choose sending funds.",
    },
    {
      question: "What happens if I don't use all my checks each month?",
      answer:
        "They stay within your account, and you can use them at any time.",
    },
    {
      question: "How often are checks recommended to do?",
      answer:
        "An answer to this depends on your unique risk model. The general recommendation would be to perform an AML check every time you interact with an unknown wallet or a smart contract.",
    },
    {
      question: "What cryptocurrencies does AMLBot analyze?",
      answer:
        "AMLBot supports all major blockchains and tokens on them. We are constantly adding support for additional cryptocurrencies. You can always check the up-to-date list of supported cryptocurrencies in web dashboard or in API Documentation.",
    },
    {
      question: "What if I will need more checks?",
      answer:
        "You can buy additional checks as needed. The number of checks is always displayed within your user information.",
    },
  ];
  

  return (
    <div id="faq" className="bg-gray-100 py-12 px-7">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Section */}
        <div className="bg-blue-100 p-6 h-max rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Is your question not on the list?</h3>
          <p className="text-gray-700 mb-4">
            Contact us via messenger. We are in touch 24/7, are always ready to answer quickly, and are in the chat now.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600">
            Write a message →
          </button>
        </div>

        {/* FAQ Section */}
        <div className="col-span-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4"
              >
                <button
                  className="w-full text-left text-lg font-medium text-gray-800 flex justify-between items-center"
                  onClick={() => toggleQuestion(index)}
                >
                  {faq.question}
                  <span className="text-blue-500">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
