export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-black pt-20">
      <div className="container mx-auto px-6 py-12">
        <header className="mb-16 text-center">
          <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn delay-200">
            <p className="text-3xl font-bold text-white leading-relaxed tracking-wide">
              Welcome to the trust layer for decentralized compute.
            </p>
            <p className="text-2xl font-bold text-gray-200 leading-relaxed tracking-wide">
              We're revolutionizing decentralized networks by blending affordability with AWS-level reliability.
            </p>
          </div>
          <div className="mt-8 animate-fadeIn delay-600">
          </div>
        </header>

        <main className="space-y-20">
          <section className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6 border-b pb-2 border-red-700">
              Why Quok.it?
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-200 leading-relaxed">
                While decentralized compute networks cost a fraction of AWS, 
                reliability issues force most teams back to centralized systems.
                Quok.it delivers hardware validation, error detection and resolution, and health metrics to networks, 
                enhancing reliability and granting unprecedented transparency between networks and GPU providers.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6 border-b pb-2 border-red-700">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-200 leading-relaxed">
                Interested in working with us? Fill out our waitlist form and we'll get in touch!
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
