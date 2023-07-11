const getTelInputValue=(data:any)=>{
    return {
        countryCode:data.countryCode,
        dialCode:data.dialCode,
        e164Number:`${data.dialCode}${data.mobileNo}`,
        internationalNumber:`${data.dialCode}${data.mobileNo}`,
        nationalNumber:data.mobileNo,
        number:data.mobileNo
      }
}

const getAddress=(address:any)=>{
  let lat = address.geometry.location.lat()
    let lng = address.geometry.location.lng()
    let aArray:any = address.address_components;

    const getCountry = ()=>{
      let value = '';

      aArray.map((item:any)=>{
        if(item.types[0] == "country"){
          value = item.long_name
        }
      })
		  return value;
		}

    const getCity = ()=>{
      let value = '';
      aArray.map((item:any)=>{
        if(item.types[0] == "locality"){
          value = item.long_name
        }
      })
		  return value;
		}

  const getLocality = ()=>{
      let value = '';
      aArray.map((item:any)=>{
        if(item.types[0] == "sublocality_level_2"){
          value = item.long_name
        }
      })
		  return value?value:getSubLocality();
		}

    const getSubLocality=()=>{
      let value = '';
      aArray.map((item:any)=>{
        if(item.types[0] == "locality"){
          value = item.long_name
        }
      })
		  return value;
    }



    const getState = ()=>{
      let value = '';
      aArray.map((item:any)=>{
        if(item.types[0] == "administrative_area_level_1"){
          value = item.long_name
        }
      })
		  return value;
		}

    const getPostalCode = () => {
			let value = '';
			aArray.map((item: any) => {
				if (item.types[0] == "postal_code") {
					value = item.long_name
				}
			})
			return value;
		}
  let aaddress:any = {lat,lng, address:address.formatted_address, country:getCountry(), state:getState(), city:getCity(), zipcode:getPostalCode(), locality:getLocality()}
  return aaddress
}

const sharedModel={getTelInputValue,getAddress}
export default sharedModel