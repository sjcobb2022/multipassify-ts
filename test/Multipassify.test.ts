import { Multipassify } from '../src/Multipassify'

test('Invalid Secret Handle', () => {
  const wrapper = () => {
    new Multipassify('')
  }
  return expect(wrapper).toThrow('Invalid Secret')
})

test('Valid Base64 Token', () => {
  const customerData = {
    email: 'test@example.com',
    remote_ip: 'USERS IP ADDRESS',
    return_to: 'http://some.url',
  }
  const base64regex =
    /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}==)|([0-9a-zA-Z-_]{3}=))?$/

  return expect(
    new Multipassify('6fee2f4f64e3c4b35610786df324fdbc').encode(customerData)
  ).toEqual(expect.stringMatching(base64regex))
})

test('Hashes vary', () => {
  const customerData = {
    email: 'test@example.com',
    remote_ip: 'users ip address',
    return_to: 'http://some.url',
  }

  return expect(
    new Multipassify('6fee2f4f64e3c4b35610786df324fdbc').encode(customerData)
  ).not.toEqual(
    new Multipassify('6fee2f4f64e3c4b35610786df324fdbc').encode(customerData)
  )
})

test('URL With Token Valid', () => {
  const customerData = {
    email: 'test@example.com',
    remote_ip: 'users ip address',
    return_to: 'http://some.url',
  }

  const urlRegex =
    /^https:\/\/test.myshopify.com\/account\/login\/multipass\/([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}==)|([0-9a-zA-Z-_]{3}=))?$/

  return expect(
    new Multipassify('6fee2f4f64e3c4b35610786df324fdbc').generateUrl(
      customerData,
      'test.myshopify.com'
    )
  ).toEqual(expect.stringMatching(urlRegex))
})
