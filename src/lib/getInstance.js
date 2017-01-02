import {getAllInstances} from "./dialogsState";

export default function (dialog) {
  const instanceType = ( // question: what's wrong with typeof === 'string'?
    Object
      .prototype
      .toString
      .call(dialog)
      .match(/^\[object\s+(.*?)\]$/)[1]
    || ''
  ).toLowerCase();

  const elem = instanceType === 'string' ? document.getElementById(dialog) : dialog;

  return getAllInstances().filter(item => item.wrapper === elem)[0];
}
