# Abraham Jimah Zorwi — Portfolio

## Local development

```bash
npm install
npm run dev
```

## Connect the contact form

The contact form uses EmailJS to deliver messages without a backend server.

1. Create an EmailJS account and connect the email address that should receive messages.
2. Create a template containing the variables `{{from_name}}`, `{{from_email}}`, and `{{message}}`.
3. Copy `.env.example` to `.env`.
4. Replace the placeholder values with the EmailJS service ID, template ID, and public key.
5. Restart the development server after changing `.env`.

The form displays a direct-email fallback until all three environment values are configured.
