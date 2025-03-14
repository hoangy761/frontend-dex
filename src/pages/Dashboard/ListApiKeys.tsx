import React from 'react';
function ListApiKeys() {
  return (
    <div className="bg-black rounded-md mt-1 p-6">
      <table className="w-full ">
        <thead className="border-b-2 rounded-md border-slate-700">
          <tr>
            <th className="text-start">No</th>
            <th className="text-start">name</th>
            <th className="text-start">Number users</th>
            <th className="text-start">Updated</th>
            <th className="text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListApiKeys;
