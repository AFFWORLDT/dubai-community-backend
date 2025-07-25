import { useState } from 'react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  phone: string;
  rating: string;
  feedback: string;
  improvements: string;
}

const SubmitReview: React.FC = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_zebs2yd',
        'template_7etx7ep',
        formData,
        'ER-5_M7wltsiLwVMT'
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Submit Your Review</h1>

      {isSubmitted ? (
        <p style={styles.successMessage}>✅ Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Rating:</label>
            <select
              name="rating"
              required
              value={formData.rating}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select</option>
              <option value="Excellent">🌟 Excellent</option>
              <option value="Very Good">👍 Very Good</option>
              <option value="Good">🙂 Good</option>
              <option value="Average">😐 Average</option>
              <option value="Poor">👎 Poor</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>What did you like the most?</label>
            <textarea
              name="feedback"
              rows={4}
              value={formData.feedback}
              onChange={handleChange}
              style={styles.textarea}
            ></textarea>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>What can we improve?</label>
            <textarea
              name="improvements"
              rows={4}
              value={formData.improvements}
              onChange={handleChange}
              style={styles.textarea}
            ></textarea>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmitReview;

// -------------------
// Inline CSS Styles
// -------------------
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    background: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};
