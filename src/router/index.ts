import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        icon: 'dashboard'
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/OrdersView.vue'),
      meta: {
        icon: 'clipboard'
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('@/views/ProductsView.vue'),
      meta: {
        icon: 'box'
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: () => import('@/views/Customer/CustomersView.vue'),
      redirect: '/customers/general',
      meta: {
        icon: 'user'
      },
      children: [
        {
          name: 'General',
          path: 'general',
          component: () => import('@/views/Customer/CustomersGeneralView.vue'),
          meta: {
            icon: 'house'
          }
        },
        {
          path: 'billing',
          name: 'Billing',
          component: () => import('@/views/Customer/CustomersBillingView.vue'),
          meta: {
            icon: 'cash-register'
          }
        },
        {
          path: 'currency',
          name: 'Currency',
          component: () => import('@/views/Customer/CustomersCurrencyView.vue'),
          meta: {
            icon: 'pound-sign'
          }
        },
        {
          path: 'payment',
          name: 'Payment',
          component: () => import('@/views/Customer/CustomersPaymentView.vue'),
          meta: {
            icon: 'money-bill'
          }
        },
        {
          path: 'faqs',
          name: 'FAQs',
          component: () => import('@/views/Customer/CustomersFAQView.vue'),
          meta: {
            icon: 'question'
          }
        }
      ]
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: () => import('@/views/NotificationsView.vue'),
      meta: {
        icon: 'bell'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        icon: 'exclamation-triangle'
      }
    }
  ]
})

export default router
