import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { baseApi } from "../../api/baseApi";
import { BASE_API } from "../../../BaseApi/BaseApi";


const initialState = {
  membershipCards: [],
  isLoading: false,
  isError: false,
  error: "",
};

// export const popularHotelApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCountry: builder.query({
//       query: () => "/country",
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     }),
//   }),
// });

export const getMembershipCards = createAsyncThunk(
  "membershipCards/getMembershipCards",
//   async () => {
//     const res = await popularHotelApi();
//     const data = res.json();
// console.log('popular',data)
//     return data;
//   }
  async () => {
    const res = await fetch(`${BASE_API}/memberships`, {
    // const res = await fetch("http://127.0.0.1:8000/api/country", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = res.json();
    // console.log("data" , data);

    return data;
  }
);


export const addMembershipCard= createAsyncThunk("membershipCards/addMembershipCard", async(values)=>{

  console.log(values)
  return fetch(`${BASE_API}/memberships`, { method:"POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  // body: {
  //     name: values.name,
  //     description: values.description,
  //     image: values.image,
  //     amount_type: values.amount_type,
  //     amount : values.amount,
  //     price : values.price,
  //     view_order : values.view_order,
  //     is_active : values.is_active,
  // }

  body: values

  }).then((res)=> res.json());

});


const membershipCardSlice = createSlice({
  name: "membershipCards",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipCards.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMembershipCards.fulfilled, (state, action) => {
        state.membershipCards = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(getMembershipCards.rejected, (state, action) => {
        state.membershipCards = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });


       // add MembershipCard 
    builder.addCase(addMembershipCard.pending, (state, action)=>{
        state.isLoading= true
        state.error= ''
    })
   .addCase(addMembershipCard.fulfilled, (state, action)=>{
    console.log(action.payload)
         state.isLoading=false
         state.membershipCards=[]
    })

    .addCase(addMembershipCard.rejected, (state, action)=>{
        state.isLoading= false
        state.membershipCards=[]
        state.error= action.error.message
    })

  },
});

export default membershipCardSlice.reducer;
