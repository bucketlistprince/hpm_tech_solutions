'use client';

import Link from 'next/link';
import { formatDate, formatCurrency } from '../../lib/utils/date';

export default function ProjectInvoices({ projectId, invoices = [] }) {


  const getStatusBadge = (status) => {
    const statusMap = {
      PAID: 'bg-green-100 text-green-800',
      UNPAID: 'bg-yellow-100 text-yellow-800',
      OVERDUE: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusMap[status] || 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Invoices</h2>
        <Link 
          href={`/invoices/new?projectId=${projectId}`}
          className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          + New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">No invoices found</p>
          <div className="mt-2">
            <Link
              href={`/invoices/new?projectId=${projectId}`}
              className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
            >
              Create your first invoice
            </Link>
          </div>
        </div>
      ) : (
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Link 
                      href={`/invoices/${invoice.id}`}
                      className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
                    >
                      #{invoice.id.slice(-6).toUpperCase()}
                    </Link>
                    <p className="text-xs text-gray-500">
                      Due {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </p>
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {invoices.length > 0 && (
        <div className="mt-4 text-center">
          <Link
            href={`/projects/${projectId}/invoices`}
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            View all invoices
          </Link>
        </div>
      )}
    </div>
  );
}
