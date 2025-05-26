import { useCreateNewsLetterMutation } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [createNewsLetter, { isLoading }] = useCreateNewsLetterMutation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      const response = await createNewsLetter({ email }).unwrap();

      if (response.status === "success") {
        setEmail("");
        toast.success("Successfully subscribed to the newsletter!");
      } else {
        toast.error(
          response.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Subscription failed. Please try again."
      );
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Join Our Newsletter
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Get exclusive news, tips, and insights delivered straight to your
          inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full sm:w-auto flex-1 px-5 py-3 rounded-xl border ${
              error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black`}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-semibold rounded-xl transition-all duration-200"
          >
            Subscribe
          </button>
        </form>

        {error && (
          <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
        )}

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-500">
          We respect your privacy. No spam ever.
        </p>
      </div>
      <Loader loading={isLoading} />
    </section>
  );
};

export default NewsletterSection;
