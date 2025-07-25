'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  phone: string;
  rating: string;
  feedback: string;
  improvements: string;
}

const ratings = [
  { value: 'Excellent', label: '🌟 Excellent', color: 'text-green-500' },
  { value: 'Very Good', label: '👍 Very Good', color: 'text-blue-500' },
  { value: 'Good', label: '🙂 Good', color: 'text-yellow-500' },
  { value: 'Average', label: '😐 Average', color: 'text-orange-500' },
  { value: 'Poor', label: '👎 Poor', color: 'text-red-500' },
];

const SubmitReview = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    rating: '',
    feedback: '',
    improvements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredRating, setHoveredRating] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare template parameters including the recipient email
      const templateParams = {
        ...formData,
        to_email: 'operations@mybookings.ae',
        from_name: formData.name,
        reply_to: formData.email,
      };

      await emailjs.send(
        'service_zebs2yd',  // Your Service ID
        'template_7etx7ep', // Your Template ID
        templateParams,
        'ER-5_M7wltsiLwVMT' // Your Public Key
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        rating: '',
        feedback: '',
        improvements: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error sending your review. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback has been submitted successfully. We appreciate your time and valuable input!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-3xl font-bold text-white text-center">
            Share Your Experience
          </h1>
          <p className="mt-2 text-blue-100 text-center">
            Your feedback helps us improve and serve you better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex flex-wrap gap-2">
              {ratings.map((rating) => (
                <button
                  key={rating.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: rating.value })}
                  onMouseEnter={() => setHoveredRating(rating.value)}
                  onMouseLeave={() => setHoveredRating('')}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    formData.rating === rating.value
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : hoveredRating === rating.value
                      ? 'bg-gray-100 border-gray-300'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${rating.color}`}
                >
                  {rating.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What did you like the most?
            </label>
            <textarea
              name="feedback"
              rows={4}
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Share your positive experiences..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What can we improve?
            </label>
            <textarea
              name="improvements"
              rows={4}
              value={formData.improvements}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Your suggestions help us grow..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Review'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitReview; 