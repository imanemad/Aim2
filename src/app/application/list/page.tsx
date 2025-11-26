"use client";
import BiDashCircleFill from "@/components/icons/BiDashSquareFill";
import BiPlusCircleFill from "@/components/icons/BiPlusSquareFill";
import BiArrowLeft from "@/components/icons/BiArrowLeft";
import BiSearch from "@/components/icons/BiSearch";
import moment from "moment-jalaali";
import toast from "react-hot-toast";
import { useGetTransactionsQuery } from "@/services/transactions/hooks";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Transactions() {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactionsQuery();

  const [query, setQuery] = useState("");

  // فیلتر شده‌ها
    const filteredTransactions = useMemo(() => {
      if (!transactions) return [];
        const q = query.trim().toLowerCase();
  
      if (!q) return transactions;
  
      return transactions.filter(item => {
        return (
          item.categoryName.toLowerCase().includes(q)
        );
      });
    }, [transactions, query]);

    const sortedTransactions = filteredTransactions ? [...filteredTransactions].reverse() : [];

  if (isError) {
    toast.error(error.message);
    return <div className="ErrorState">خطا در بارگذاری مخاطبین.</div>;
  }

  return (
    <div className="Container">
      <div className="FlexBetween">
        <div className="Search">
          <input
            type="text"
            placeholder="جستجوی تراکنش"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BiSearch size={19} />
        </div>
        <button className="Btn Btn-Black">فیلتر تراکنش ها</button>
      </div>
      <div className="List">
        {isLoading ? (
          <div className="p-2">Loading...</div>
        ) : (
          <>
            {sortedTransactions?.map((item) => {
              return (
                <Link
                  href={`/application/list/${item.id}`}
                  className="Item"
                  key={item.id}
                >
                  <div className="FlexBetween">
                    <div className="Title">
                      {item.categoryName}
                    </div>
                    <div className="flex FlexG8">
                      <small className="En">{moment(item.date).format("jYYYY/jMM/jDD")}</small>
                      <BiArrowLeft />
                    </div>
                  </div>
                  <div className="FlexBetween mt-3">
                    <small>
                      {` مانده ${item.bankName} ${item.lastBalanceBank.toLocaleString()}`}
                    </small>
                    
                    <div className="flex items-center space-x-1.5">
                        <small className="En">{item.amount.toLocaleString()}</small>
                        {item.type === "deposit" ? 
                          <BiPlusCircleFill className="Plus" size={13} />
                          : 
                          <BiDashCircleFill className="Dash" size={13} />
                        }
                      </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
