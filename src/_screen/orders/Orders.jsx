import Style from './style.module.css'
import { useSelector } from 'react-redux';

export { Orders };

function Orders() {
    const mobile = useSelector(x => x.mobile.value)
    const handleSubmit = () => {
        // console.log("submit");
    }
    return (
        <div className={Style.order_mainContainer} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
            <div className={Style.filters_wrapper}>
                <h6 className={Style.filter_title}>Filters</h6>
                <hr style={{ borderColor: "#dcdcdc", opacity: .3 }} />

                <div className={Style.search_form}>
                    <form>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search</label>
                            <input name="search" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Status</label>
                            <input name="status" className={Style.filter_input} type='text' placeholder='Order Status' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Store</label>
                            <input name="store" className={Style.filter_input} type='text' placeholder='Search Stores' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search Users</label>
                            <input name="user" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Created At</label>
                            <input name="date" className={Style.filter_input} type='date' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_buttonwrapper}>
                            <button className={Style.filter_button} onClick={handleSubmit()}>Filter</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <OrdersList/> */}
        </div>
    );
}
