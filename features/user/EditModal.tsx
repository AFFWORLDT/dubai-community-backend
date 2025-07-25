import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useUpdateUser from './useUpdateUser';

interface User {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  profileImg?: string;
}

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, setIsOpen, user }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      image: null as string | null,
    },
    mode: 'onChange',
  });

  // Sync user data when the modal opens or user changes
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        image: user.profileImg || null,
      });
      setImageUrl(user.profileImg || '');
    }
  }, [user, form]);

  const { isPending, updateuser } = useUpdateUser();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'chat-app');
      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dbqdqof8u/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        setImageUrl(data.secure_url);
        form.setValue('image', data.secure_url);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        ...data,
        profileImg: imageUrl,
      };
       updateuser(userData);
       if(user){
        form.reset({
          fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        image: user.profileImg || null,
        });
        setImageUrl(user.profileImg || '');
       }else{
        form.reset({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          image: "",
        });
        setImageUrl("")
       }
  
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageUpload(e);
                          field.onChange(e.target.files?.[0] ?? null);
                        }}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    {imageUrl && (
                      <div className="mt-2">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditModal;
