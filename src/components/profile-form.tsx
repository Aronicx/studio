"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  dailyThought: z.string().max(200, "Thought must be 200 characters or less.").optional(),
  contact: z.object({
    phone: z.string().optional(),
    instagram: z.string().optional(),
    snapchat: z.string().optional(),
    discord: z.string().optional(),
    gmail: z.string().email("Invalid email address.").optional().or(z.literal("")),
    other: z.string().optional(),
  }),
  hobbies: z.array(z.object({ value: z.string().min(1, "Hobby cannot be empty.") })),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
  onSave: (data: User) => void;
  onCancel: () => void;
}

export function ProfileForm({ user, onSave, onCancel }: ProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      dailyThought: user.dailyThought,
      contact: {
        phone: user.contact.phone || '',
        instagram: user.contact.instagram || '',
        snapchat: user.contact.snapchat || '',
        discord: user.contact.discord || '',
        gmail: user.contact.gmail || '',
        other: user.contact.other || ''
      },
      hobbies: user.hobbies.map(h => ({ value: h })),
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hobbies",
  });

  const onSubmit = (data: ProfileFormValues) => {
    const updatedUser: User = {
      ...user,
      name: data.name,
      id: data.name.toLowerCase().replace(/\s+/g, '-'), // Update ID based on new name
      dailyThought: data.dailyThought || '',
      contact: data.contact,
      hobbies: data.hobbies.map(h => h.value),
    };

    if (data.newPassword && !user.passwordChanged) {
      updatedUser.password = data.newPassword;
      updatedUser.passwordChanged = true;
    }

    onSave(updatedUser);
    toast({
        title: "Profile Saved",
        description: "Your changes have been saved successfully.",
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Public Information</CardTitle>
          <CardDescription>This is visible to everyone on the network.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register('name')} />
            {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="dailyThought">Daily Thought (max 200 chars)</Label>
            <Textarea id="dailyThought" {...form.register('dailyThought')} maxLength={200} />
            {form.formState.errors.dailyThought && <p className="text-sm text-destructive mt-1">{form.formState.errors.dailyThought.message}</p>}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Share how others can connect with you.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Phone</Label><Input placeholder="Your phone number" {...form.register('contact.phone')} /></div>
          <div><Label>Instagram</Label><Input placeholder="Your Instagram username" {...form.register('contact.instagram')} /></div>
          <div><Label>Snapchat</Label><Input placeholder="Your Snapchat username" {...form.register('contact.snapchat')} /></div>
          <div><Label>Discord</Label><Input placeholder="Your Discord username" {...form.register('contact.discord')} /></div>
          <div>
            <Label>Gmail</Label>
            <Input placeholder="Your Gmail address" {...form.register('contact.gmail')} />
            {form.formState.errors.contact?.gmail && <p className="text-sm text-destructive mt-1">{form.formState.errors.contact.gmail.message}</p>}
          </div>
          <div><Label>Other Link</Label><Input placeholder="Any other link" {...form.register('contact.other')} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hobbies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...form.register(`hobbies.${index}.value`)} />
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Hobby
          </Button>
        </CardContent>
      </Card>

      {!user.passwordChanged && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>You can only change your password once. This action is permanent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" {...form.register('newPassword')} />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
                  {form.formState.errors.confirmPassword && <p className="text-sm text-destructive mt-1">{form.formState.errors.confirmPassword.message}</p>}
                </div>
            </CardContent>
          </Card>
      )}
       {user.passwordChanged && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription className="text-destructive">Your password has already been changed once and cannot be changed again.</CardDescription>
            </CardHeader>
          </Card>
        )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
