"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correctPassword?: string;
  onSuccess: () => void;
}

export function PasswordDialog({ open, onOpenChange, correctPassword, onSuccess }: PasswordDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  }

  const handleSubmit = () => {
    if (password === correctPassword) {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };
  
  const handleClose = (isOpen: boolean) => {
    if(!isOpen) {
      setError('');
      setPassword('');
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Enter your password to make changes to your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password-check" className="text-right">
                Password
              </Label>
              <Input
                id="password-check"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="col-span-3"
                required
              />
            </div>
            {error && <p className="col-span-4 text-center text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => handleClose(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
