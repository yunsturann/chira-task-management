/* eslint-disable @next/next/no-img-element */

// ** Custom Components
import ContactForm from "@/components/contact/contact-form";
import Container from "@/components/shared/container";

const ContactPage = () => {
  return (
    <div>
      <Container paddingVertical>
        <div className="mb-6 flex justify-between items-center  gap-x-4 ">
          <header className="text-center sm:text-left">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-2">
              Contact Us
            </h1>
            <p className="text-gray-500 dark:text-gray-400 sm:w-3/5">
              {`We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    Enter correct details so we can get back to you.
                `}
            </p>
          </header>

          <img
            src="./images/contact.jpg"
            alt="contact"
            width={130}
            height={130}
          />
        </div>

        <ContactForm />
      </Container>
    </div>
  );
};

export default ContactPage;
