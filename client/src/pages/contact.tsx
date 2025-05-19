import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CartSidebar from '@/components/layout/cart-sidebar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

const contactSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters',
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = (values: ContactFormValues) => {
    // In a real app, you would send this data to your backend
    console.log(values);
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });
    form.reset();
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us - Foolivery</title>
        <meta name="description" content="Get in touch with the Foolivery team for questions, feedback, or support with your food delivery orders." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Have questions, feedback or need support? We're here to help you!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-poppins font-semibold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div>
                <div className="bg-white p-8 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-poppins font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Address</h3>
                        <p className="text-gray-600">123 College Street, Your City, 12345</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <i className="fas fa-phone-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Phone</h3>
                        <p className="text-gray-600">+1 (123) 456-7890</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <i className="fas fa-envelope text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Email</h3>
                        <p className="text-gray-600">info@foolivery.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <i className="fas fa-clock text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Business Hours</h3>
                        <p className="text-gray-600">Monday - Sunday: 10:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-poppins font-semibold mb-6">Connect With Us</h2>
                  <div className="flex space-x-4">
                    <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </>
  );
}
