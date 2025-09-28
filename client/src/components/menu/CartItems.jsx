import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { removeItem } from "../../redux/slice/cartSlice";

const CartItems = () => {
    const cartData = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const scrollRef = useRef()

    useEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        })
      }
    }, [cartData])

    const handleRemove = (itemId) => {
      dispatch(removeItem(itemId))
    }

    return (
    <div>
        <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]" ref={scrollRef}>
        {cartData.length === 0 ? (
            <div className="flex justify-center items-center h-[380px] w-full">
            <p className="text-[#ababab] text-sm text-center">
                Keranjang Anda kosong. Tambahkan barang!
            </p>
          </div>
        ) : (
          cartData.map((item) => {
            return (
              <div key={item.id} className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-[#ababab] font-semibold tracling-wide text-md">
                    {item.name}
                  </h1>
                  <p className="text-[#ababab] font-semibold">
                    x{item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => handleRemove(item.id)}
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                    <FaNotesMedical
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                  </div>
                  <p className="text-[#f5f5f5] text-md font-bold">
                    Rp{item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartItems;
