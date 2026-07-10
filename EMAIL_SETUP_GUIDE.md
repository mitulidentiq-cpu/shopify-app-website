# Email Form Integration Setup Guide (Klenzo Website)

This guide explains how the **Newsletter Signup** and the **Support & Feedback Hub** forms are configured to route submissions directly to `support@klenzo.app` using the free Web3Forms API.

---

## 📂 File Architecture

The email integration touches the following files:
*   **`.env`**: Local environment variables (contains the API key).
*   **`.env.example`**: Reference template for environment variables.
*   **`src/components/ui/minimal-footer.tsx`**: Contains the newsletter form and subscription `fetch` handler.
*   **`src/components/ui/feedback-section.tsx`**: Contains the rating review, bug report, and feature suggestion tab form and submission handler.

---

## ⚡ How Web3Forms Works

Web3Forms is a serverless contact form API that requires zero backend coding.
1. The React app makes a `POST` request to `https://api.web3forms.com/submit`.
2. The payload contains `access_key` (which tells Web3Forms where to route the email).
3. Web3Forms formats the fields and sends the submission directly to the email registered with that `access_key`.

---

## ⚙️ Step-by-Step Setup Guide

Follow these steps to activate email delivery for both forms:

### Step 1: Resolve Hostinger Email Setup (Domain Verification)
If you see the warning **"Your domain is not fully working yet..."** in Hostinger:
1. Verify that your domain's **MX Records** are correctly pointing to Hostinger's email servers.
2. Wait for **DNS Propagation** (can take between 1 to 24 hours depending on the registrar).
3. Once the warning disappears, your `support@klenzo.app` mailbox is fully ready to receive emails.

### Step 2: Get Your Web3Forms API Key
1. Go to **[https://web3forms.com](https://web3forms.com)**.
2. Under the registration box, input your target email: **`support@klenzo.app`**.
3. Click **Create Access Key**.
4. Log in to your Hostinger Webmail at **`https://mail.hostinger.com`** and open the email from Web3Forms.
5. Copy the access key string (e.g., `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

*(Note: For immediate testing, you can input a personal Gmail address on web3forms.com, get the key in Gmail, and use it. You can switch it to `support@klenzo.app` later).*

### Step 3: Add the Key to `.env`
Open the **[`.env`](file:///d:/OneDrive/Desktop/shopify-app-website/.env)** file in your editor and paste the key:

```env
# Web3Forms API Access Key (Routes form submissions to support@klenzo.app)
VITE_WEB3FORMS_ACCESS_KEY=your_copied_access_key_here
```

Restart your local dev server (`npm run dev`) for Vite to load the new environment variables.

---

## 🧪 Verification and Testing

1. Go to the footer of the site, enter an email, and click **Subscribe**.
2. Go to the **Feedback & Support Hub** section on the homepage:
   *   Select a tab (e.g., **Report Bug** or **Submit Review**).
   *   Enter your details and click **Submit Feedback**.
3. Verify that:
   *   The loader spins, and a checked success card displays.
   *   You receive formatted emails from **Klenzo Merchant Support Hub** in your `support@klenzo.app` inbox.

---

## 🛠️ Code Reference (For Future Developers/Agents)

### Newsletter Form Submit
Located in `src/components/ui/minimal-footer.tsx#L11-L54`:
```typescript
const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;
  setIsSubmitting(true);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // Graceful fallback for local development
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1200);
    return;
  }

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Newsletter Subscriber (Klenzo)",
        from_name: "Klenzo Website Newsletter",
        email: email,
        message: `A user has subscribed to the newsletter. Email: ${email}`,
      }),
    });
    setIsSubmitted(true);
    setEmail("");
  } catch (error) {
    console.error("Submission error:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Support Hub Form Submit
Located in `src/components/ui/feedback-section.tsx#L25-L95`:
Reads form attributes (`name`, `email`, `storeUrl`, `message`, `type`, `rating`, `bugSeverity`, `appAffected`), formats them into a clean message block, and posts it to `api.web3forms.com/submit`.
