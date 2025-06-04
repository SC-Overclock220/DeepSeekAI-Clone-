import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL;
const countries = [
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
    { code: 'AL', name: 'Albania', flag: '🇦🇱' },
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴' },
    { code: 'AI', name: 'Anguilla', flag: '🇦🇮' },
    { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
    { code: 'AW', name: 'Aruba', flag: '🇦🇼' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
    { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
    { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: 'BM', name: 'Bermuda', flag: '🇧🇲' },
    { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
    { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
    { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬' },
    { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
    { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
    { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾' },
    { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
    { code: 'CG', name: 'Congo', flag: '🇨🇬' },
    { code: 'CD', name: 'Congo, Democratic Republic of the', flag: '🇨🇩' },
    { code: 'CK', name: 'Cook Islands', flag: '🇨🇰' },
    { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
    { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
    { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
    { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
    { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
    { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
    { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
    { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰' },
    { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴' },
    { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'GF', name: 'French Guiana', flag: '🇬🇫' },
    { code: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
    { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'GI', name: 'Gibraltar', flag: '🇬🇮' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: 'GL', name: 'Greenland', flag: '🇬🇱' },
    { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
    { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵' },
    { code: 'GU', name: 'Guam', flag: '🇬🇺' },
    { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
    { code: 'GG', name: 'Guernsey', flag: '🇬🇬' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
    { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
    { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
    { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷' },
    { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'IM', name: 'Isle of Man', flag: '🇮🇲' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'JE', name: 'Jersey', flag: '🇯🇪' },
    { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
    { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
    { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
    { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: 'LA', name: 'Laos', flag: '🇱🇦' },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
    { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
    { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾' },
    { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
    { code: 'MO', name: 'Macao', flag: '🇲🇴' },
    { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'MT', name: 'Malta', flag: '🇲🇹' },
    { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
    { code: 'MQ', name: 'Martinique', flag: '🇲🇶' },
    { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { code: 'YT', name: 'Mayotte', flag: '🇾🇹' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
    { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
    { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
    { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
    { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
    { code: 'MS', name: 'Montserrat', flag: '🇲🇸' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
    { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
    { code: 'NA', name: 'Namibia', flag: '🇳� pele' },
    { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
    { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'NU', name: 'Niue', flag: '🇳🇺' },
    { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫' },
    { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'OM', name: 'Oman', flag: '🇴🇲' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'PW', name: 'Palau', flag: '🇵🇼' },
    { code: 'PA', name: 'Panama', flag: '🇵🇦' },
    { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
    { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'PN', name: 'Pitcairn', flag: '🇵🇳' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
    { code: 'RE', name: 'Réunion', flag: '🇷🇪' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱' },
    { code: 'SH', name: 'Saint Helena', flag: '🇸🇭' },
    { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
    { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
    { code: 'MF', name: 'Saint Martin', flag: '🇲🇫' },
    { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
    { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
    { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽' },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
    { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
    { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
    { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
    { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'SY', name: 'Syria', flag: '🇸🇾' },
    { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
    { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬' },
    { code: 'TK', name: 'Tokelau', flag: '🇹🇰' },
    { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
    { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
    { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
    { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'VI', name: 'Virgin Islands, U.S.', flag: '🇻🇮' },
    { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫' },
    { code: 'EH', name: 'Western Sahara', flag: '🇪🇭' },
    { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' }
];
const SignUp = () => {


    const navigate = useNavigate();




    const inputClasses = 'w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#db251e]';

    const [formData, setFormData] = useState({

        firstname: "", lastname: "", email: "", username: "", password: "", country: ""
    });
    const [signUpError, setSignUpError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleInputChange = (e) => {


        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        setSignUpError('');

        const { firstname, lastname, email, password, username, country } = formData;

        if (!firstname || !lastname || !email || !password || !username || !country) {


            setSignUpError(`None Of The Required Fields Can Be Empty`);
            return toast.error(`None Of The Required Fields Can Be Empty`);


        }


        try {

            const { data } = await axios.post(`${baseURL}/auth/signup`, formData, { withCredentials: true });

            console.log(data);

            if (data.success) {
                navigate('/login');
                return toast.success(data.message);

            }


            return toast.error(data.message);

        } catch (error) {


            console.log(error);
            return toast.error(error.response.data.message);

        }







    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-black px-4'>


            <form className='bg-app-dark text-white w-fill max-w-md rounded-2xl p-6 shadow-lg' onSubmit={handleSubmit}>

                {/* Heading */}

                <h1 className='text-center text-3xl mb-8'>Sign Up</h1>
                {/* First Name */}
                <div className='my-3 '>

                    <label className='mb-2' htmlFor='firstname'>First Name</label>

                    <input className={inputClasses} type='text' name='firstname' placeholder='Enter FirstName' id='firstname' value={formData.firstname} onChange={handleInputChange} />

                </div>
                {/* LastName */}
                <div className='my-3'>
                    <label className='mb-2' htmlFor='lastname'>Last Name</label>

                    <input className={inputClasses} type='text' name='lastname' placeholder='Enter LastName' id='lastname' value={formData.lastname} onChange={handleInputChange} />

                </div>

                {/* Email */}
                <div className='my-3'>

                    <label htmlFor='email'>Email</label>

                    <input className={inputClasses} type='email' name='email' placeholder='Enter Email' id='email' value={formData.email} onChange={handleInputChange} />

                </div>

                {/* Username */}
                <div className='my-3'>
                    <label htmlFor='username'>Username</label>

                    <input className={inputClasses} type='text' name='username' placeholder='Enter Username' id='username' value={formData.username} onChange={handleInputChange} />

                </div>
                {/* Password */}
                <div className='my-3'>
                    <label htmlFor='password'>Password</label>

                    <div className='relative'>

                        <input className={inputClasses} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter Password' id='password' value={formData.password} onChange={handleInputChange} />
                        {!showPassword ? <IoEyeSharp size={18} className='right-3 top-3 text-gray-400 absolute cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> : <IoEyeOffSharp size={18} className='right-3 top-3 text-gray-400 absolute cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}

                    </div>

                </div>

                {/* Country */}

                <div className='my-3'>
                    <label htmlFor='country'>Country</label>

                    <select
                        name="country"
                        id="country"
                        value={formData.country}
                        className={inputClasses}
                        onChange={handleInputChange}
                        required

                    >
                        <option value="" disabled>
                            Select a country
                        </option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.name} className='bg-app-dark'>

                                <div >

                                    <span>{country.code}</span>
                                    {" - "}
                                    <span >{country.name}</span>
                                    {" "}
                                    <span>{country.flag}</span>

                                </div>


                            </option>
                        ))}
                    </select>

                </div>


                {/* Error */}

                <div className={`${signUpError ? 'block' : 'hidden'} text-red-600 text-sm`}>{signUpError}</div>



                {/* Terms and Conditions */}

                <p className='text-xs text-gray-400 my-5'>By Signing In, you consent to Clone AI's <a className='underline' href=''>Privacy Policy</a></p>


                <button type='submit' className='w-full bg-red-600 text-white font-semibold py-2 rounded-lg transition hover:bg-red-700'>Sign Up</button>

                {/* links */}

                <div className='text-center my-3'>

                    Already Registered?  <Link className='text-red-600 underline' to="/login">Login </Link>
                </div>




            </form >
        </div >
    )
}

export default SignUp