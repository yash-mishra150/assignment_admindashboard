"use client";

import { Label } from '@/app/components/ui/label';
import { Card, CardContent } from '@/app/components/ui/card';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Save, ArrowLeft } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Replace empty interface with proper type
type PageProps = Record<string, never>;
// OR simply remove the props parameter:
// const Page = () => {

const Page = ({}: PageProps) => {
  // State for current step and form data
  const [step, setStep] = useState<number>(() => {
    // Try to get the step from localStorage
    if (typeof window !== 'undefined') {
      const savedStep = localStorage.getItem('formStep');
      return savedStep ? parseInt(savedStep, 10) : 1;
    }
    return 1;
  });
  
  const [formData, setFormData] = useState<FormData>(() => {
    // Try to get the form data from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('formData');
      return savedData ? JSON.parse(savedData) : {
        name: '',
        email: '',
        street: '',
        city: '',
        zip: ''
      };
    }
    return {
      name: '',
      email: '',
      street: '',
      city: '',
      zip: ''
    };
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('formStep', step.toString());
  }, [formData, step]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate current step
  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      // Validate Basic Info
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    } else if (currentStep === 2) {
      // Validate Address for Indian format
      if (!formData.street.trim()) {
        newErrors.street = 'Street address is required';
        isValid = false;
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
        isValid = false;
      }
      
      if (!formData.zip.trim()) {
        newErrors.zip = 'PIN code is required';
        isValid = false;
      } else if (!/^[1-9][0-9]{5}$/.test(formData.zip)) {
        newErrors.zip = 'Please enter a valid 6-digit Indian PIN code';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Clear localStorage after successful submission
    localStorage.removeItem('formData');
    localStorage.removeItem('formStep');
    
    // Here you would typically send the data to your API
    toast.success('User added successfully! Check console for details.');
    
    // Optionally redirect to dashboard after submission
    // router.push('/dashboard');
  };

  // Render form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input 
                id="street" 
                name="street" 
                value={formData.street} 
                onChange={handleChange} 
                placeholder="123, Sector 4"
              />
              {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="New Delhi"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">PIN Code</Label>
              <Input 
                id="zip" 
                name="zip" 
                value={formData.zip} 
                onChange={handleChange} 
                placeholder="110001"
              />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-medium">Review & Confirm</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Basic Information</h4>
                  <p><span className="text-gray-500">Name:</span> {formData.name}</p>
                  <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Address</h4>
                  <p><span className="text-gray-500">Street:</span> {formData.street}</p>
                  <p><span className="text-gray-500">City:</span> {formData.city}</p>
                  <p><span className="text-gray-500">PIN Code:</span> {formData.zip}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">Please review the information above before submitting.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // Render step indicator
  const StepIndicator = () => {
    return (
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 h-1 w-full bg-gray-200 -z-10 transform -translate-y-1/2"></div>
        {[1, 2, 3].map((stepNumber) => (
          <motion.div 
            key={stepNumber} 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className={`rounded-full h-10 w-10 flex items-center justify-center font-semibold z-10 ${
                stepNumber === step ? 'bg-teal-600 text-white' : stepNumber < step ? 'bg-teal-200 text-teal-800' : 'bg-gray-200 text-gray-600'
              }`}
              animate={stepNumber === step ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {stepNumber}
            </motion.div>
            <span className="text-xs mt-1">
              {stepNumber === 1 ? 'Basic Info' : stepNumber === 2 ? 'Address' : 'Review'}
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      <motion.div 
        className='mx-4 md:mx-8 lg:mx-16 pt-6 md:pt-10 pb-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className='flex items-center mb-6'
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/dashboard" className="flex items-center text-teal-600 hover:text-teal-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </motion.div>

        <h1 className='text-2xl font-bold text-gray-800'>User Management</h1>
        <h2 className='font-medium text-base text-neutral-400 mb-6'>dashboard &gt; add a user</h2>
        
        <motion.div
          layoutId="form-card"
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardContent className="pt-6">
              <StepIndicator />
              
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
                
                <motion.div 
                  className="flex justify-between mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {step > 1 ? (
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                        className="flex items-center"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link href="/dashboard">
                        <Button 
                          type="button" 
                          variant="outline"
                          className="flex items-center"
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                  
                  {step < 3 ? (
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-teal-600 hover:bg-teal-700 text-white flex items-center"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button 
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white flex items-center"
                      >
                        <Save className="h-4 w-4 mr-1" /> Submit
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;