const FAQsPage = () => {
  return (
    <section className="pb-16 px-4 max-w-6xl mx-auto bg-[#fefcff]">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

      <div className="space-y-4">
        <details className="group border border-gray-300 rounded-lg overflow-hidden">
          <summary className="list-none px-4 py-2 cursor-pointer flex items-center justify-between group-open:bg-gray-100">
            <span className="font-medium">What is this website about?</span>
            <span className="transition transform group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="px-4 py-2">
            <p>This website is a platform for [describe the platform's purpose].</p>
          </div>
        </details>

        <details className="group border border-gray-300 rounded-lg overflow-hidden">
          <summary className="list-none px-4 py-2 cursor-pointer flex items-center justify-between group-open:bg-gray-100">
            <span className="font-medium">How do I create an account?</span>
            <span className="transition transform group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="px-4 py-2">
            <p>To create an account, click on the "Sign Up" button and follow the instructions.</p>
          </div>
        </details>

        <details className="group border border-gray-300 rounded-lg overflow-hidden">
          <summary className="list-none px-4 py-2 cursor-pointer flex items-center justify-between group-open:bg-gray-100">
            <span className="font-medium">Is there a mobile app available?</span>
            <span className="transition transform group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="px-4 py-2">
            <p>
              Currently, we do not have a mobile app. However, the website is fully responsive and can be accessed on
              any device.
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}

export default FAQsPage
