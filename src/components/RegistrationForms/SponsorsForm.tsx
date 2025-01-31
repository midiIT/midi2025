import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BACKEND_URL } from '@/consts.ts';

interface SponsorFormData {
  companyName: string;
  contactInfo: string;
  message: string;
}

const SponsorsForm: React.FC = () => {
  const [formData, setFormData] = useState<SponsorFormData>({
    companyName: '',
    contactInfo: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch(`${BACKEND_URL}/sponsors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        setSubmitted(true);
      } else {
        setErrorMessage('Klaida siunčiant duomenis. Pabandykite vėliau.');
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setErrorMessage('Klaida siunčiant duomenis. Pabandykite vėliau.');
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen px-4 lg:px-8 py-6">
      {submitted ? (
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-6 text-black">
            Ačiū! Susisieksime su Jumis artimiausiu metu.
          </h2>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8 p-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 es:text-lg md:text-2xl lg:text-3xl text-black text-center">
            Rėmėjų registracija
          </h2>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Kompanijos pavadinimas *
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Kontaktinė informacija *
                <input
                  type="text"
                  name="contactInfo"
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Žinutė *
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-base md:text-lg"
            >
              Siųsti
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SponsorsForm;
