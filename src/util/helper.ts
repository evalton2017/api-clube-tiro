class Helper {
  sendResponse = function (res: any, statusCode: any, data: any) {
    res.status(statusCode).json({ result: data });
  };
}

export default new Helper();
