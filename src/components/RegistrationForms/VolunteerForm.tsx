import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BACKEND_URL } from '@/consts.ts';

interface VolunteerFormData {
  fullName: string;
  email: string;
  events: string[];
  comments: string;
}

const VolunteerForm: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    events: [],
    comments: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      events: checked
        ? [...prevData.events, name]
        : prevData.events.filter(e => e !== name),
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError('El. pašto adresas netinkamas.');
      } else {
        setEmailError(null);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!emailRegex.test(formData.email)) {
      setEmailError('El. pašto adresas netinkamas.');
      return;
    }

    if (formData.events.length === 0) {
      setErrorMessage('Privaloma pasirinkti bent vieną renginį.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/volunteer`, {
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
    <div className="bg-gray-800 min-h-screen flex items-center justify-center es:px-0 lg:px-8 lg:py-10">
      {submitted ? (
        <div className="max-w-4xl w-full p-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-6 text-black">
            Ačiū, kad užsiregistravote į savanorius! Greitu metu su jumis
            susisieksime!
          </h2>
        </div>
      ) : (
        <div className="max-w-4xl w-full space-y-8 p-10 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl">
          <h2 className="text-xl font-semibold text-center mb-6 es:text-lg md:text-2xl lg:text-3xl text-black">
            Savanorių registracija
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
                Vardas, Pavardė *
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                El. paštas *
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => {
                    if (!emailRegex.test(formData.email)) {
                      setEmailError('El. pašto adresas netinkamas.');
                    }
                  }}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg ${
                    emailError
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300'
                  }`}
                />
              </label>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <fieldset className="space-y-4">
              <legend className="text-gray-700 mb-2 font-semibold text-lg">
                Prie kurių renginių norėtumėte prisidėti?
              </legend>
              {[
                'Šachmatų turnyras',
                'LAN Party',
                'Įmonių mugė',
                'Sporto dienos',
                'Sportinio pokerio turnyras',
                'Orientacinės',
                'Protmūšis',
                'Roko opera',
                'Uždarymo vakaras',
              ].map(event => (
                <div key={event}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name={event}
                      checked={formData.events.includes(event)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 text-sm es:text-xs md:text-base">
                      {event}
                    </span>
                  </label>
                </div>
              ))}
            </fieldset>
            <div>
              <label className="block text-gray-700 mb-2">
                Papildomi komentarai
                <textarea
                  name="comments"
                  id="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
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

export default VolunteerForm;
