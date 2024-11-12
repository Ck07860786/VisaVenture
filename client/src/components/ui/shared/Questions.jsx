import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Questions() {
  return (
    <>
      <h1 className="text-4xl font-medium drop-shadow-lg mt-32 text-center text-black">FAQs</h1>
      <p className="mt-5 text-zinc-500 mb-10 text-center">
        Quick answers to common questions about VisaVenture.
      </p>
      <div className="custom-transparent mb-20">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I apply for a visa using this platform?</AccordionTrigger>
            <AccordionContent>
            Simply register on our platform, choose a verified agent based on your budget, ratings, and reviews, and follow their guidance to submit your visa application.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Are all the agents on this platform verified?</AccordionTrigger>
            <AccordionContent>
            Yes, all agents undergo a KYC verification process to ensure they are trustworthy and reliable before they can list their services on our platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is my personal information secure on this platform?</AccordionTrigger>
            <AccordionContent>
            Absolutely. We prioritize your security and use encryption and secure payment methods to protect your personal data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How does the payment process work?</AccordionTrigger>
            <AccordionContent>
            We use a secure escrow payment system. Funds are held until both you and the agent are satisfied with the service, ensuring a safe transaction for both parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I communicate directly with the agent?</AccordionTrigger>
            <AccordionContent>
            Yes, we offer real-time communication features that allow you to contact your chosen agent directly for any updates or questions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>How can I become an agent on this platform?</AccordionTrigger>
            <AccordionContent>
            Agents can register by completing their KYC verification process and listing their services. Once approved, you can start offering visa services to clients.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        
      </div>
    </>
  );
}

export default Questions;
