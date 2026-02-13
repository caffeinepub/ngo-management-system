import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Heart, Award, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/ngo-hero-illustration.dim_1600x900.png"
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Making a Difference Together</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of changemakers. Manage memberships, track donations, and create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Become a Member</Button>
              </Link>
              <Link to="/enquiry">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Member Management</CardTitle>
                <CardDescription>Streamlined registration and member tracking</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Beneficiary Support</CardTitle>
                <CardDescription>Track and manage assistance programs</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Campaign Tracking</CardTitle>
                <CardDescription>Monitor fundraising goals and progress</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Certificates</CardTitle>
                <CardDescription>Automated certificate generation with QR verification</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our organization today and be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Register Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
