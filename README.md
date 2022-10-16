# Multipassify

```ts
// define or import multipass token from .env
const SHOPIFY_MULTIPASS_TOKEN = '6fee2f4f64e3c4b35610786df324fdbc';
 
const customerData = {
	email: 'test@example.com',
	remote_ip: 'USERS IP ADDRESS',
	return_to: 'http://some.url'
};

const multipassify = new Multipassify(SHOPIFY_MULTIPASS_TOKEN);

const token = multipassify.encode(customerData)

const url = multipassify.getUrl(customerData, 'yourstore.myshopify.com')

```

Typescript bindings for using Shopify's multipass authentication system.

Basic test suite included.

Follow the the instructions [here](https://shopify.dev/api/multipass) to obtain multipass access. Please note that you need ShopifyPlus to access this feature.
