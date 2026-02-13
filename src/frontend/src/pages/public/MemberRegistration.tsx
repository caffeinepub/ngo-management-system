import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRegisterMember } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { ExternalBlob, Gender, Status } from '../../backend';

export default function MemberRegistration() {
  const navigate = useNavigate();
  const registerMember = useRegisterMember();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    designation: '',
    gender: Gender.male,
    dobDay: '',
    dobMonth: '',
    dobYear: '',
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const memberId = `MEM${Date.now()}`;
      const referralId = `REF${memberId}`;

      let photoBlob = ExternalBlob.fromBytes(new Uint8Array());
      if (photoFile) {
        const arrayBuffer = await photoFile.arrayBuffer();
        photoBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      await registerMember.mutateAsync({
        id: memberId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        designation: formData.designation || 'Member',
        gender: formData.gender,
        dob: {
          day: parseInt(formData.dobDay) || 1,
          month: parseInt(formData.dobMonth) || 1,
          year: parseInt(formData.dobYear) || 2000,
        },
        referralId,
        joiningDate: new Date().toISOString().split('T')[0],
        status: Status.active,
        photo: photoBlob,
      });

      toast.success('Registration successful! Your Member ID is: ' + memberId);
      navigate({ to: '/' });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Member Registration</CardTitle>
          <CardDescription>Join our organization and become part of our community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g., Volunteer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value: Gender) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.male}>Male</SelectItem>
                    <SelectItem value={Gender.female}>Female</SelectItem>
                    <SelectItem value={Gender.other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Day"
                  value={formData.dobDay}
                  onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })}
                  type="number"
                  min="1"
                  max="31"
                />
                <Input
                  placeholder="Month"
                  value={formData.dobMonth}
                  onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })}
                  type="number"
                  min="1"
                  max="12"
                />
                <Input
                  placeholder="Year"
                  value={formData.dobYear}
                  onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })}
                  type="number"
                  min="1900"
                  max="2100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
              {photoPreview && (
                <div className="mt-2">
                  <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={registerMember.isPending}>
              {registerMember.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
