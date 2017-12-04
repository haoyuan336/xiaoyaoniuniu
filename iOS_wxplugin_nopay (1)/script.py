#!/usr/bin/python
#coding=utf-8

from any_open_api import AnyiOSOpenAPI

def script(SDK, work_dir, target_name, usrSDKConfig, SDKDestDir, project):
    api_obj = AnyiOSOpenAPI(SDK, work_dir, target_name, usrSDKConfig, SDKDestDir, project)
    
    wx_appid = api_obj.get_param_value("WXAppId")
    api_obj.add_plist_url_schemes(wx_appid, "weixin")
    api_obj.add_plist_queries_schemes("weixin wechat")
    
    code_add = 'NSMutableDictionary *WXPluginParams = [[NSMutableDictionary alloc] init];\n\t[WXPluginParams setObject:url forKey:@"WXApiOpenURL"];\n\tSEL WXPluginSelector = NSSelectorFromString(@"WXApiApplication:");\n\t[NSClassFromString(@"WxpluginWrapper") performSelector:WXPluginSelector withObject:WXPluginParams afterDelay:0.01];'

    api_obj.add_delegate_code("sourceApplication:", '- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation',code_add)
    
    api_obj.add_delegate_code("handleOpenURL:", "- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url",code_add)




