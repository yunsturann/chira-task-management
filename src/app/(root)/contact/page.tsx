// ** Custom Components
import ContactForm from "@/components/contact/contact-form";
import Container from "@/components/shared/container";

const ContactPage = () => {
  return (
    <div>
      <Container paddingVertical>
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 sm:w-3/5">
            {`We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                Enter correct details so we can get back to you.
            `}
          </p>
        </header>
        <ContactForm />
      </Container>
    </div>
  );
};

export default ContactPage;
