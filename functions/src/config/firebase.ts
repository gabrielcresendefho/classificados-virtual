import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp({
  //credential: admin.credential.cert({
  //  privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
  //  projectId: functions.config().project.id,
  //  clientEmail: functions.config().client.email
  //}),
  credential: admin.credential.cert({
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDh8D97A34l+8nx\nmfckl/7P1WQvKfAjfmaFHsLAHYDIObRnzi4MtDkQckxINN94BHWVt4yz6BW9ktLx\nC7dHnUijUucLF5ZtWUs8lJTSh7utrF9SIt807k10B6P8VvVHtc2rtedYfCTm5rMG\nGLmEk72hXUy6smztiInRySRdQryq6YYppyGyTExTa1fHcQhX0LIIh9B8Niea2LEZ\nDeNvtqaG0UoiBrrn1lQhMUjtUoabvNJw5G5GTHbKebCoOdYkGzNaUXO3nGVE1k42\nfk+7dqy+kp26J8VGnZuSU5ead689N+BtEtlTyPZ271gL5UCKXCfuRUxKjZOpcRWO\nTCfudQSrAgMBAAECggEACxQDmNC2bVha/rZE6idsJN0N5eSEumJm1nbup6RxFxNo\ndBqMIxVT78Ma8gNqdz3ViIf3Py8AoErEF9hlastPr3c2J7lG9LxtgvfqE1r40Dtk\n2E5bawLJ2DszrQDHU0MBZaT5EsHR8WLO1MKx/f0pTb5l/IiyuWbgRkgHH23q4E2U\nj4UIrA7zTwC1QYRlwaJzHxV8TphyrEDoqNDihcAUmvV8Wo+h0+7+vL49jnZWLJP3\ne6s/XZ6BhoajoQGm/CXV3+GtR0SAoqw2S8gTYRc2UoQUsgViqCR8SXjU5sVRskFD\nOXRJbcQml1oZCj1UbaHeO+ghI+2YRmfWC4gGPL00wQKBgQD8FOZa2X1QUZGD/cNa\n3FK3VoPnF5eYuwIs9Em0dv3dpMV0IM5jzPuH454bxKukvKhRjK8yMF+OPmp68AJj\nHl+USTxWayHka9tP7ezsYXOO6+/gX831o/uP4LonNSwlbtFwH6qGv3pjwkWlmQyS\nLLm/QipjU8avck9+8tV2i2wVSwKBgQDlc1FGvGnj747jbqnMzf6AKGYkHdz+xAUY\nmZf1JZsKcf8EQV5bofeRUv2yyHSL0pPB+d3m0kRayUMPcbinJ/S5dXdMavnyBg1J\nhVsK9No7DNb30ehgODgeb0aOZdnhgU1in0/HWaBUgout7bXYdumwZ+nhKwLpcQIJ\nUETbKrUSIQKBgFo9jR02wIKRQLt0i4uqVb4mLX/71RwqziOTrBL7ifPfeYQR/nCB\nwAWseTxNknidxM+0wj8ATCTauTmbU+9xvxuRgBUbsv1XkyIw9WDFnh2q3qt/AHcQ\nJg0ikOFaSpx36GfwHhaw0zqFIHOgr3xgoHoUUKJQKk9CZ6z1d29BiAazAoGAcIVz\nxzegyinxrbDYTlp6w0iMhouqk7l3MlAoSA0wEhhDUkfoSRGNwdOsHF/XX7ZdxZOO\ncaKN6OOoIkvHnRmoFsb3QR95AWpcW8CtHBtlZe3vAcsLpRwM0UgKlsx14/OwCnxL\n+FwIl0kJzLq1Ibl28o6TEFwyal6D/CNEESLJd2ECgYEAqVjy4OnDvAfeGaKxY+j/\nsrpMoC/4YCtoje/ka9PsopCOlGCZE0KQY/onUozMrtP8FqfB7Xwk+2GtrUHJx7X4\n+2dikPNgdNaifrhO0Vh68mYdPsLu73hbJmAJzqAWBeMrOes50QxbeCjYSkQEdpJM\nuOTxyj0Ai9WhU7YxsMq0ujk=\n-----END PRIVATE KEY-----\n",
    projectId: "classificados-virtual",
    clientEmail: "firebase-adminsdk-fla6x@classificados-virtual.iam.gserviceaccount.com"
  }),
  databaseURL: 'https://classificados-virtual.firebaseio.com'
})

const db = admin.firestore()
export { admin, db, functions }