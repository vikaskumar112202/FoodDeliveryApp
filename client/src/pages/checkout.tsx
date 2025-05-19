import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart, useCartUtils } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import OrderSuccessModal from '@/components/layout/order-success-modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { Helmet } from 'react-helmet';
import { CartItemRow } from '@/components/ui/cart-items';

const checkoutSchema = z.object({
  fullName: z.string().min(3, {
    message: 'Full name must be at least 3 characters',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters',
  }),
  zipCode: z.string().min(5, {
    message: 'Zip code must be at least 5 characters',
  }),
  additionalNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, clearCart } = useCart();
  const { subtotal, deliveryFee, total } = useCartUtils();
  const { isAuthenticated } = useAuth();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    total: number;
    estimatedDelivery: string;
  } | null>(null);
  
  // Redirect if cart is empty or user is not authenticated
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
    
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [items.length, isAuthenticated, navigate]);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      additionalNotes: '',
    },
  });
  
  const createOrder = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {
      const orderData = {
        ...data,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total,
        paymentMethod: 'COD'
      };
      
      const res = await apiRequest('POST', '/api/orders', orderData);
      return res.json();
    },
    onSuccess: (data) => {
      // Set order details for success modal
      setOrderDetails({
        orderNumber: data.id.toString(),
        total: data.total,
        estimatedDelivery: '30-45 minutes'
      });
      
      // Show success modal
      setOrderSuccess(true);
      
      // Clear the cart
      clearCart();
      
      // Invalidate orders query to refresh order history
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
  });
  
  const onSubmit = (values: CheckoutFormValues) => {
    createOrder.mutate(values);
  };
  
  const closeSuccessModal = () => {
    setOrderSuccess(false);
    navigate('/');
  };
  
  return (
    <>
      <Helmet>
        <title>Checkout - Foolivery</title>
        <meta name="description" content="Complete your order on Foolivery with our easy checkout process and cash on delivery payment." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-poppins font-bold">Checkout</h1>
              <p className="text-gray-600 mt-2">Complete your order</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-poppins">Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Delivery Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your zip code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Any special instructions for delivery" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="mt-6 pt-6 border-t">
                          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                          <div className="bg-gray-100 p-4 rounded-md flex items-center">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                            <div className="ml-3">
                              <span className="font-medium">Cash on Delivery</span>
                              <p className="text-sm text-gray-500">Pay when your order arrives</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full mt-6 bg-primary hover:bg-primary/90"
                          disabled={createOrder.isPending}
                        >
                          {createOrder.isPending ? 'Processing...' : 'Place Order'}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-poppins">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                      ))}
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <OrderSuccessModal 
          isOpen={orderSuccess} 
          onClose={closeSuccessModal}
          orderDetails={orderDetails}
        />
      </div>
    </>
  );
}
