import { motion } from "framer-motion";
import { useState } from "react";

const BACKEND_URL = "http://localhost:3001/send";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Błąd wysyłki");

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Skontaktuj <br />
              Się <span className="inline-block ml-2">→</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">
              Formularz Kontaktowy
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
              Masz pomysł na produkt, stronę albo eksperyment webowy? Napisz kilka zdań — odpowiem możliwie szybko.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider">Imię*</label>
                <input
                  type="text" id="firstName" name="firstName"
                  value={formData.firstName} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider">Nazwisko*</label>
                <input
                  type="text" id="lastName" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Email*</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">Temat*</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">Wiadomość*</label>
              <textarea
                id="message" name="message" rows={3}
                value={formData.message} onChange={handleChange}
                className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Submit */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center gap-3 text-lg font-bold uppercase tracking-wider hover:text-black/70 transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Wysyłanie…" : "Wyślij Wiadomość"}
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">✓ Wiadomość wysłana! Odpowiem Ci wkrótce.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500 font-medium">✗ Coś poszło nie tak. Spróbuj ponownie.</p>
              )}
            </div>

          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
