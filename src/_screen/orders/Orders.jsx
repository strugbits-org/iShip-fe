import Style from './style.module.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import { orderData } from './orderData';
// import { OrdersList } from './Orderlist';

export { Orders };

function Orders() {
    const mobile = useSelector(x => x.mobile.value)

    const [filter, setFilter] = useState({
        orderNo: '',
        status: '',
        store: '',
        merchant: '',
        createdAt: '',
    });
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle filter logic here
        console.log(filter);
    };

    return (
        <div className={Style.order_mainContainer} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
            <div className={Style.filters_wrapper}>
                <h6 className={Style.filter_title}>Filters</h6>
                <hr style={{ borderColor: "#dcdcdc", opacity: .3 }} />

                <div className={Style.search_form}>
                    <form onSubmit={handleSubmit}>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search</label>
                            <input onChange={handleChange} value={filter.name}
                                name="orderNo" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Status</label>
                            <input onChange={handleChange} name="status" className={Style.filter_input} type='text' placeholder='Order Status' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Store</label>
                            <input onChange={handleChange} name="store" className={Style.filter_input} type='text' placeholder='Search Stores' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search Users</label>
                            <input onChange={handleChange} name="merchant" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Created At</label>
                            <input onChange={handleChange} name="createdAt" className={Style.filter_input} type='date' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_buttonwrapper}>
                            <button type="submit" className={Style.filter_button} >Filter</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <OrdersList/> */}
        </div>
    );
}
